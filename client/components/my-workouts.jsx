import React from 'react';
import WorkoutCard from './cards/workout-card';
import TextInput from './inputs/text-input';
import NetworkError from './network-error';
import LoadingSpinner from './loading-spinner';
import { AppContext } from '../lib';

export default class MyWorkouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutData: [],
      fetchingData: false,
      networkError: false
    };
  }

  componentDidMount() {
    this.setState({
      fetchingData: true
    }, () => {
      const { user } = this.context;
      const req = {
        method: 'GET',
        headers: {
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      fetch('/api/workouts', req)
        .then(response => response.json())
        .then(result => {
          this.setState({
            workoutData: result,
            fetchingData: false
          });
        })
        .catch(error => {
          console.error('There was an error!', error);
          this.setState({
            networkError: true
          });
        });
    });
  }

  render() {
    if (this.state.networkError) {
      return <NetworkError />;
    }
    if (this.state.fetchingData) {
      return <LoadingSpinner />;
    }
    const { workoutData } = this.state;
    return (
      <>
        <div>
          <h1 className="text-3xl font-lora font-medium mb-4">My Workouts</h1>
          <TextInput placeholder="Search by title, description, distance-type, or date..." type="text" name="searchbar" id="searchbar"/>
        </div>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8">
          { workoutData.map((workout, index) => { return <WorkoutCard key={index} data={workout}/>; })}
        </div>
      </>
    );
  }
}
MyWorkouts.contextType = AppContext;
