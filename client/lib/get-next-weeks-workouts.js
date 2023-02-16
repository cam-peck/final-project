import { isBefore, isAfter, addDays, subDays } from 'date-fns';
import removeTz from './remove-tz';

export default function getNextWeeksWorkouts(workoutData) {
  const nextWeeksWorkouts = [];
  const start = subDays(new Date(), 1); // yesterday, so that we include today
  const end = addDays(start, 8); // up to one week from today
  workoutData.forEach(workout => {
    const workoutDate = new Date(removeTz(workout.date));
    if (isAfter(workoutDate, start) && isBefore(workoutDate, end)) {
      nextWeeksWorkouts.unshift(workout);
    }
  });
  return nextWeeksWorkouts;
}
