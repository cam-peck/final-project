import { format } from 'date-fns';

export default function filterRuns(testString, runData) {
  const formattedTestString = testString.toLowerCase().replaceAll(',', '');
  const filteredData = runData.filter(run => {
    const dt = new Date(run.date);
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    const formattedDate = format(dtDateOnly, 'EEEE MMMM do yyyy');
    const { title, description, distanceUnits } = run;
    const runText = (title + description + distanceUnits + formattedDate).toLowerCase();
    if (runText.includes(formattedTestString)) {
      return true;
    } else return false;
  });
  return filteredData;
}
