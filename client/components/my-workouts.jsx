import React from 'react';
import WorkoutCard from './cards/workout-card';
import TextInput from './inputs/text-input';

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
    console.log('component mounted: fetching workout data');
  }

  render() {
    return (
      <>
        <div>
          <h1 className="text-3xl font-lora font-medium mb-4">My Workouts</h1>
          <TextInput placeholder="Search by title, description, distance-type, or date..." type="text" name="searchbar" id="searchbar"/>
        </div>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8">
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
          <WorkoutCard />
        </div>
      </>
    );
  }
}
