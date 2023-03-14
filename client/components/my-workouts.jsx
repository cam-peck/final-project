import React, { useState, useEffect, useContext } from 'react';
import FilteredWorkouts from './filtered-workouts';
import TextInput from './inputs/text-input';
import NetworkError from './network-error';
import LoadingSpinner from './loading-spinner';
import AddButton from '../components/add-button';
import { AppContext, filterWorkouts } from '../lib';

export default function MyWorkouts(props) {
  const [workoutData, setWorkoutData] = useState([]);
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
        const response = await fetch('/api/workouts', req);
        const result = await response.json();
        setWorkoutData(result);
        setFetchingData(false);
      } catch (err) {
        console.error('There was an error!', err);
        setNetworkError(true);
      }
    };
    fetchData();
  }, [user]);

  const deleteWorkout = async workoutId => {
    setFetchingData(true);
    const req = {
      method: 'DELETE',
      headers: {
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      user
    };
    try {
      const response = await fetch('/api/workouts/' + workoutId, req);
      await response.json();
      const indexToRemove = workoutData.findIndex(workoutData => workoutData.workoutId === workoutId);
      const newWorkoutData = Array.from(workoutData);
      newWorkoutData.splice(indexToRemove, 1);
      setWorkoutData(newWorkoutData);
      setFetchingData(false);
    } catch (err) {
      console.error('There was an error!', err);
      setNetworkError(true);
    }
  };

  if (networkError) return <NetworkError />;
  if (fetchingData) return <LoadingSpinner />;

  const filteredWorkouts = filterWorkouts(searchText, workoutData);
  return (
    <>
      <header>
        <h1 className="text-2xl font-lora font-medium mb-4">My Workouts</h1>
        <TextInput placeholder="Search by date, description, or notes..." type="text" name="searchbar" id="searchbar" value={searchText} onChange={event => setSearchText(event.target.value)} disabled={workoutData.length === 0}/>
      </header>
      <section>
        {
            workoutData.length === 0
              ? <p className="text-center italic">No workouts found... Add a workout using the &quot;+&quot; button in the bottom right.</p>
              : filteredWorkouts.length !== 0 ? <FilteredWorkouts workoutData={filteredWorkouts} deleteWorkout={deleteWorkout} /> : <p className='italic text-center'>No workouts found with your search parameters...</p>
          }
      </section>
      <AddButton link='/workouts/upload' />
    </>
  );
}
