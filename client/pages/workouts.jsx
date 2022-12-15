import React from 'react';
import Redirect from '../components/redirect';
import { AppContext } from '../lib';
import WorkoutForm from '../components/forms/workout-form';

export default class Workouts extends React.Component {
  render() {
    const { user } = this.context;
    const { mode } = this.props;

    if (!user) return <Redirect to="sign-in"/>;

    return (
      <main>
        <div className="max-w-md md:max-w-4xl mx-auto px-6 mt-4">
          <WorkoutForm mode={mode} />
        </div>
      </main>
    );
  }
}
Workouts.contextType = AppContext;
