import React, { createRef, useEffect, useState, useContext } from 'react';
import { calculatePace, AppContext, removeTz, parseGpxData } from '../../lib';
import TextInput from '../inputs/text-input';
import DatePicker from 'react-datepicker';
import UploadRunCard from '../cards/upload-run-card';
import { subYears } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import DistanceInput from '../inputs/distance-input';
import DurationInput from '../inputs/duration-input';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';
import TimeoutError from '../timeout-error';
import NotFound from '../../pages/not-found';

export default function RunForm(props) {
  const { mode, entryId } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [durationHours, setDurationHours] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [durationSeconds, setDurationSeconds] = useState('');
  const [distance, setDistance] = useState('');
  const [distanceUnits, setDistanceUnits] = useState('miles');
  const [hasGpx, setHasGpx] = useState(false);
  const [gpxPath, setGpxPath] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false);
  const [idError, setIdError] = useState(false);

  const { user } = useContext(AppContext);
  const fileInputRef = createRef();

  useEffect(() => {
    const prefillForm = async () => {
      setFetchingData(true);
      const entryId = Number(props.entryId);
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      try {
        const response = await fetch(`/api/runs/${entryId}`, req);
        if (response.status === 404) {
          setIdError(true);
          return;
        }
        const result = await response.json();
        const { runData, gpxData } = result;
        const { title, description, date, duration, distance, distanceUnits, hasGpx } = runData;
        const splitDuration = duration.split(':');
        const dtDateOnly = removeTz(date);
        setTitle(title);
        setDescription(description);
        setDate(dtDateOnly);
        setDurationHours(splitDuration[0]);
        setDurationMinutes(splitDuration[1]);
        setDurationSeconds(splitDuration[2]);
        setDistance(distance);
        setDistanceUnits(distanceUnits);
        setHasGpx(hasGpx);
        setGpxPath(gpxData);
        setFetchingData(false);
        setNetworkError(false);
        setIdError(false);
      } catch (err) {
        console.error('An error occured!', err);
        setNetworkError(true);
        setFetchingData(false);
      }
    };
    if (mode === 'edit') {
      prefillForm();
    }
  }, [entryId, mode, props.entryId, user]);

  const toggleGpxTrue = () => {
    setHasGpx(true);
  };

  const handleGpxData = event => {
    setFetchingData(true);
    const file = event.target.files[0];
    if (file.size > 10485760) {
      fileInputRef.current.value = '';
      alert('File is too large. Maximum file size is 10MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsedData = parseGpxData(event.target.result);
        const { date, path, distance, durationObj } = parsedData;
        setDate(removeTz(new Date(date)));
        setGpxPath(path);
        setDistance(distance);
        setDistanceUnits('kilometers');
        setDurationHours(String(durationObj.hours));
        setDurationMinutes(String(durationObj.minutes));
        setDurationSeconds(String(durationObj.seconds));
        setFetchingData(false);
      } catch (error) {
        fileInputRef.current.value = '';
        alert('Could not read GPX data. Check your GPX file to ensure data is valid.');
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setFetchingData(true);
    const body = { title, description, date, durationHours, durationMinutes, durationSeconds, distance, distanceUnits, hasGpx, gpxPath };
    const req = {
      method: `${mode === 'add' ? 'POST' : 'PUT'}`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      user,
      body: JSON.stringify(body)
    };
    try {
      const response = await fetch(`${mode === 'add' ? '/api/runs' : '/api/runs/' + entryId}`, req);
      const result = await response.json();
      if (result.error) {
        setTimeoutError(true);
        return;
      }
      window.location.hash = '#home?tab=activities';
    } catch (err) {
      console.error('An error occured!', err);
      setNetworkError(true);
    }
  };

  const retryTimeout = () => {
    setTimeoutError(false);
  };

  if (idError) return <NotFound />;
  if (networkError) return <NetworkError />;
  if (timeoutError) return <TimeoutError handleSubmit={handleSubmit} retryTimeout={retryTimeout}/>;
  if (fetchingData) return <LoadingSpinner />;

  const pace = calculatePace(distance, distanceUnits, durationHours, durationMinutes, durationSeconds);
  const titleMessage = mode === 'add'
    ? 'Add Run'
    : 'Edit Run';
  const buttonText = mode === 'add'
    ? 'Add Run'
    : 'Save Changes';

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-lora font-bold mb-4">{titleMessage}</h1>
      <section className="md:flex gap-6">
        <div className="md:w-2/4 w-full flex-shrink-0 mt-0.5">
          <UploadRunCard fileInputRef={fileInputRef} toggleGpxTrue={toggleGpxTrue} handleGpxData={handleGpxData} gpxPath={gpxPath} hasGpx={hasGpx}/>
        </div>
        <div className="md:flex md:gap-6">
          <div className="w-full">
            <p className="font-lora font-md text-md font-medium pb-2" >Date</p>
            <DatePicker className="w-full rounded-lg px-3 py-3.5 border border-gray-300 focus:outline-blue-500 mb-4" selected={date} onChange={date => setDate(date)} dateFormat='MM/dd/yyy' maxDate={new Date()} minDate={subYears(new Date(), 80)} disabled={hasGpx} required/>
            <DistanceInput integerName='distance' integerValue={distance} distanceTypeName='distanceUnits' distanceTypeValue={distanceUnits} onChange={event => setDistance(event.target.value)} disabled={hasGpx}/>
            <DurationInput hourValue={durationHours} minuteValue={durationMinutes} secondValue={durationSeconds} onHourChange={setDurationHours} onMinuteChange={setDurationMinutes} onSecondChange={setDurationSeconds} disabled={hasGpx}/>
            <TextInput type="pace" name="pace" placeholder="0:00 / mi" value={pace} showLabel={true} label="Pace" disabled={hasGpx} readOnly={true}/>
          </div>
        </div>
      </section>
      <TextInput type="text" name="title" showLabel={true} label="Title" placeholder="Morning Sun Run" value={title} onChange={event => setTitle(event.target.value)} />
      <TextInput type="text" name="description" showLabel={true} label="Description" placeholder="Easy run with great weather -- nice recovery day" value={description} onChange={event => setDescription(event.target.value)} />
      <div className="flex justify-end mt-2 mb-8">
        <button className="md:w-1/3 w-full bg-blue-500 transition ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold text-lg">{buttonText}</button>
      </div>
    </form>
  );
}
