import { format } from 'date-fns';

export default function filterWorkouts(regex, workoutData) {
  const lowercaseNoCommaRegex = regex.toLowerCase().replaceAll(',', '');
  const filteredData = workoutData.filter(workout => {
    const dt = new Date(workout.date);
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    const formattedDate = format(dtDateOnly, 'EEEE MMMM do yyyy');
    const { description, warmupNotes, workoutNotes, cooldownNotes } = workout;
    const runText = (description + warmupNotes + workoutNotes + cooldownNotes + formattedDate).toLowerCase();
    if (new RegExp(lowercaseNoCommaRegex).test(runText)) {
      return true;
    } else return false;
  });
  return filteredData;
}
