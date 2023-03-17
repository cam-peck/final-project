import React, { useContext, useEffect } from 'react';
import { AppContext } from '../lib';
import WorkoutForm from '../components/forms/workout-form';
import MyWorkouts from '../components/my-workouts';
import { useNavigate } from 'react-router-dom';

export default function Workouts(props) {
  const { user } = useContext(AppContext);
  const { mode } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  return (
    <main>
      <section className="max-w-6xl mx-auto mt-6 px-6">
        {
          mode === 'view'
            ? <MyWorkouts />
            : <WorkoutForm mode={mode} />
        }
      </section>
    </main>
  );
}
