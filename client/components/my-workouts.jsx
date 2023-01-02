import React from 'react';
import FilteredWorkouts from './filtered-workouts';
import TextInput from './inputs/text-input';
import NetworkError from './network-error';
import LoadingSpinner from './loading-spinner';
import { AppContext, filterWorkouts } from '../lib';

export default class MyWorkouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutData: [],
      fetchingData: false,
      networkError: false,
      searchText: ''
    };
    this.deleteWorkout = this.deleteWorkout.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
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

  deleteWorkout(workoutId) {
    this.setState({
      fetchingData: true
    }, () => {
      const { user } = this.context;
      const { workoutData } = this.state;
      const req = {
        method: 'DELETE',
        headers: {
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      fetch('/api/workouts/' + workoutId, req)
        .then(response => response.json())
        .then(result => {
          const indexToRemove = workoutData.findIndex(workoutData => workoutData.workoutId === workoutId);
          const newWorkoutData = Array.from(workoutData);
          newWorkoutData.splice(indexToRemove, 1);
          this.setState({
            workoutData: newWorkoutData,
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

  handleSearchChange(event) {
    this.setState({ searchText: event.target.value });
  }

  render() {
    if (this.state.networkError) {
      return <NetworkError />;
    }
    if (this.state.fetchingData) {
      return <LoadingSpinner />;
    }
    const { workoutData, searchText } = this.state;
    const { deleteWorkout } = this;
    const filteredWorkouts = filterWorkouts(searchText, workoutData);
    return (
      <>
        <header>
          <h1 className="text-2xl font-lora font-medium mb-4">My Workouts</h1>
          <TextInput placeholder="Search by date, description, or notes..." type="text" name="searchbar" id="searchbar" value={searchText} onChange={this.handleSearchChange} disabled={workoutData.length === 0}/>
        </header>
        <section>
          {
            workoutData.length === 0
              ? <p className="text-center italic">No workouts found... Add a workout using the &quot;+&quot; button in the bottom right.</p>
              : filteredWorkouts.length !== 0 ? <FilteredWorkouts workoutData={filteredWorkouts} deleteWorkout={deleteWorkout} /> : <p className='italic text-center'>No workouts found with your search parameters...</p>
          }
        </section>
      </>
    );
  }
}
MyWorkouts.contextType = AppContext;
