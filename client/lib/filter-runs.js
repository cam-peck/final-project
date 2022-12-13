import formatDate from './format-date';

export default function filterRuns(regex, runData) {
  const lowercaseRegex = regex.toLowerCase();
  const filteredData = runData.filter(run => {
    const formattedDate = formatDate(run.date);
    const { title, description, distanceUnits } = run;
    const runText = (title + description + distanceUnits + formattedDate).toLowerCase();
    if (new RegExp(lowercaseRegex).test(runText)) {
      return true;
    } else return false;
  });
  return filteredData;
}
