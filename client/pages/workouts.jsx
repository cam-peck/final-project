import React, { useContext } from 'react';
import Redirect from '../components/redirect';
import { AppContext } from '../lib';
import WorkoutForm from '../components/forms/workout-form';
import AddButton from '../components/add-button';
import MyWorkouts from '../components/my-workouts';

export default function Workouts(props) {
  const { user, route } = useContext(AppContext);
  const { mode, workoutId } = props;

  if (!user) return <Redirect to="#"/>;
  const renderMe = route.path === 'workout-form'
    ? <WorkoutForm mode={mode} workoutId={workoutId} />
    : <MyWorkouts />;
  const addWorkoutButton = route.path === 'workouts'
    ? <AddButton href='#workout-form?mode=add'/>
    : '';
  return (
    <main>
      <section className="max-w-6xl mx-auto mt-6 px-6">
        {renderMe}
        {addWorkoutButton}
      </section>
    </main>
  );
}
