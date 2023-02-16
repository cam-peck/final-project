import React from 'react';
import WorkoutCard from './cards/workout-card';

export default function FilteredWorkouts(props) {
  const { workoutData, deleteWorkout } = props;
  return (
    <div className="md:grid md:grid-cols-2 gap-6 md:gap-8 flex flex-col mb-4">
      {
        workoutData.map((workout, index) => {
          return (
            <WorkoutCard key={workout.workoutId} data={workout} deleteWorkout={deleteWorkout} editDeleteEnabled={true}/>
          );
        })
      }
    </div>
  );
}
