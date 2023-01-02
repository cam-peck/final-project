import { format } from 'date-fns';

export default function filterWorkouts(regex, runData) {
  const lowercaseRegex = regex.toLowerCase();
  const filteredData = runData.filter(run => {
    const dt = new Date(run.date);
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    const formattedDate = format(dtDateOnly, 'MMMM dd, yyyy');
    const { title, description, distanceUnits } = run;
    const runText = (title + description + distanceUnits + formattedDate).toLowerCase();
    if (new RegExp(lowercaseRegex).test(runText)) {
      return true;
    } else return false;
  });
  return filteredData;
}
