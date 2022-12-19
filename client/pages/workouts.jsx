import React from 'react';
import Redirect from '../components/redirect';
import { AppContext } from '../lib';
import WorkoutForm from '../components/forms/workout-form';
import MyWorkouts from '../components/my-workouts';

export default class Workouts extends React.Component {
  render() {
    const { user, route } = this.context;
    const { mode } = this.props;

    if (!user) return <Redirect to="sign-in"/>;
    const renderMe = route.path === 'workout-form'
      ? <WorkoutForm mode={mode} />
      : <MyWorkouts />;
    return (
      <main>
        <section className="max-w-6xl mx-auto mt-6 px-6">
          {renderMe}
        </section>
      </main>
    );
  }
}
Workouts.contextType = AppContext;
