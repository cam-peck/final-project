import React, { useState, useContext, useEffect } from 'react';
import { AppContext, getNextWeeksWorkouts } from '../../lib';
import ProgressSquares from '../progress-squares/progress-squares';
import WeeklyRunChart from '../week-progress-chart/weekly-run-chart';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';
import WorkoutCard from '../cards/workout-card';

export default function Progress(props) {

  const [yearlyRunData, setYearlyRunData] = useState([]);
  const [yearlyRestData, setYearlyRestData] = useState([]);
  const [weeklyRestDay, setWeeklyRestDay] = useState('None');
  const [workoutData, setYearlyWorkoutData] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  const { user } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      const req = {
        method: 'GET',
        headers: {
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      try {
        const progressResponse = await fetch('/api/progress', req);
        const progressResult = await progressResponse.json();
        const workoutResponse = await fetch('/api/workouts', req);
        const workoutResult = await workoutResponse.json();
        const restDataResponse = await fetch('/api/restDays', req);
        const restDataResult = await restDataResponse.json();
        const weeklyRestDayResponse = await fetch('/api/profile', req);
        const weeklyRestDayResult = await weeklyRestDayResponse.json();
        setYearlyRunData(progressResult.runDates);
        setYearlyWorkoutData(workoutResult);
        setYearlyRestData(restDataResult);
        setWeeklyRestDay(weeklyRestDayResult.weeklyRestDay);
        setFetchingData(false);
      } catch (err) {
        console.error('An error occured!', err);
        setNetworkError(true);
      }
    }
    fetchData();
  }, [user]);

  const toggleNetworkError = e => {
    setNetworkError(true);
  };

  if (networkError) {
    return <NetworkError />;
  }
  if (fetchingData) {
    return <LoadingSpinner />;
  }

  const nextWeeksWorkouts = getNextWeeksWorkouts(workoutData);
  return (
    <section className="pl-6 pr-6 max-w-6xl mx-auto mt-6 mb-4">
      <h1 className="font-lora font-medium text-2xl mb-6">My Progress</h1>
      <div className='mb-4'>
        <ProgressSquares
          runData={yearlyRunData}
          restData={yearlyRestData}
          setRestData={setYearlyRestData}
          weeklyRestDay={weeklyRestDay}
          setWeeklyRestDay={setWeeklyRestDay}
          toggleNetworkError={toggleNetworkError}
        />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className='w-full md:pr-4 md:w-6/12 lg:w-6/12 mb-4'>
          <WeeklyRunChart data={yearlyRunData}/>
        </div>
        <div className='w-full md:w-6/12 lg:w-6/12 h-[372px] overflow-y-scroll bg-white pl-6 pr-6 pt-5 pb-5 rounded-xl border border-gray-300 shadow-sm'>
          <h1 className="font-lora text-xl font-medium mb-6">Upcoming Workouts</h1>
          {
            nextWeeksWorkouts.length === 0
              ? <div className= "flex justify-center items-center h-60" ><p className="text-center italic">No workouts found for the next 7 days...</p></div>
              : nextWeeksWorkouts.map(workout => <div className="mb-4" key={workout.workoutId}> <WorkoutCard data={workout} editDeleteEnabled={false} /> </div>)
          }
        </div>
      </div>
    </section>
  );
}
