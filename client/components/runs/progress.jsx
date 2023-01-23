import React from 'react';
import { AppContext } from '../../lib';
import ProgressSquares from '../progress-squares/progress-squares';
import WeeklyRunChart from '../week-progress-chart/weekly-run-chart';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';
import WorkoutCard from '../cards/workout-card';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearlyRunData: [],
      workoutData: [],
      fetchingData: true,
      networkError: false
    };
  }

  async componentDidMount() {
    const { user } = this.context;
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
      this.setState({
        yearlyRunData: progressResult,
        workoutData: workoutResult,
        fetchingData: false
      });
    } catch (err) {
      console.error('An error occured!', err);
      this.setState({ networkError: true });
    }
  }

  render() {
    if (this.state.networkError) {
      return <NetworkError />;
    }
    if (this.state.fetchingData) {
      return <LoadingSpinner />;
    }
    const { yearlyRunData, workoutData } = this.state;
    return (
      <section className="pl-6 pr-6 max-w-6xl mx-auto mt-6 mb-4">
        <h1 className="font-lora font-medium text-2xl mb-6">My Progress</h1>
        <div className='mb-4'>
          <ProgressSquares data={yearlyRunData}/>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className='w-full md:pr-4 md:w-6/12 lg:w-6/12 mb-4'>
            <WeeklyRunChart data={yearlyRunData}/>
          </div>
          <div className='w-full md:w-6/12 lg:w-6/12 h-[372px] overflow-y-scroll bg-white pl-6 pr-6 pt-5 pb-5 rounded-xl border border-gray-300 shadow-sm'>
            <h1 className="font-lora text-xl font-medium mb-6">Upcoming Workouts</h1>
            {
              workoutData.map(workout => <div className="mb-4" key={workout.workoutId}> <WorkoutCard data={workout} /> </div>)
            }
          </div>
        </div>
      </section>
    );
  }
}
Progress.contextType = AppContext;
