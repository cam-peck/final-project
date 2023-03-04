import React, { useState, useEffect, useContext } from 'react';
import TextInput from '../inputs/text-input';
import RunMainCard from '../cards/run-main-card';
import FilteredRuns from './filtered-runs';
import AddButton from '../add-button';
import { AppContext, filterRuns } from '../../lib';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';

export default function Activities(props) {
  const [runData, setRunData] = useState([]);
  const [gpxData, setGpxData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openRun, setOpenRun] = useState({});
  const [searchText, setSearchText] = useState('');
  const [fetchingData, setFetchingData] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const req = {
        method: 'GET',
        headers: {
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      try {
        const runsResponse = await fetch('/api/runs', req);
        const runsResult = await runsResponse.json();
        const gpxResponse = await fetch('/api/runs/gpxData', req);
        const gpxResult = await gpxResponse.json();
        setRunData(runsResult);
        setGpxData(gpxResult);
        setFetchingData(false);
      } catch (err) {
        console.error('There was an error!', err);
        setNetworkError(true);
      }
    };
    fetchData();
  }, [user]);

  const openModal = entryId => {
    runData.forEach(run => {
      if (run.entryId === entryId) {
        setModalIsOpen(true);
        setOpenRun(run);
      }
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setOpenRun({});
  };

  const deleteRun = async entryId => {
    setFetchingData(true);
    const req = {
      method: 'DELETE',
      headers: {
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      user
    };
    try {
      const response = await fetch(`/api/runs/${entryId}`, req);
      await response.json();
      const indexToRemove = runData.findIndex(run => run.entryId === entryId);
      const newRunData = Array.from(runData);
      newRunData.splice(indexToRemove, 1);
      setOpenRun({});
      setRunData(newRunData);
      setFetchingData(false);
      closeModal();
    } catch (err) {
      console.error('There was an error!', err);
      setNetworkError(true);
    }
  };

  if (networkError) return <NetworkError />;
  if (fetchingData) return <LoadingSpinner />;

  const filteredRuns = filterRuns(searchText, runData);
  const modal = modalIsOpen === true
    ? <RunMainCard
          entryId={openRun.entryId}
          title={openRun.title}
          date={openRun.date}
          distance={openRun.distance}
          duration={openRun.duration}
          distanceUnits={openRun.distanceUnits}
          description={openRun.description}
          gpxData={gpxData[openRun.entryId]}
          closeModal={closeModal}
          deleteRun={deleteRun}
        />
    : '';
  return (
    <>
      <section className="pl-6 pr-6 max-w-lg md:max-w-2xl lg:max-w-6xl m-auto mt-6">
        <h1 className="font-lora font-medium text-2xl mb-4">My Activities</h1>
        <TextInput placeholder="Search by title, description, distance-type, or date..." type="text" name="searchbar" id="searchbar" value={searchText} onChange={event => setSearchText(event.target.value)} disabled={runData.length === 0}/>
        {
            runData.length === 0
              ? <p className="text-center italic">No runs found... Add a run using the &quot;+&quot; button in the bottom right.</p>
              : filteredRuns.length !== 0 ? <FilteredRuns runData={filteredRuns} gpxData={gpxData} openModal={openModal} /> : <p className='italic text-center'>No runs found with your search parameters...</p>
            }
        <AddButton href="#run-form?mode=add" />
      </section>
      {modal}
    </>
  );
}
