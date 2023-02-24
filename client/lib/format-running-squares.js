import { eachDayOfInterval, subYears, isSunday, previousSunday, format } from 'date-fns';

export default function formatRunningSquares(runData, restData, weeklyRestDay) {
  let startDate = subYears(new Date(), 1);
  if (!isSunday(startDate)) {
    startDate = previousSunday(startDate);
  }
  const thisYear = eachDayOfInterval({
    start: startDate,
    end: new Date()
  });
  const mappedRuns = runData.map(runDate => runDate.date.split('T')[0]);
  const mappedRestData = restData.map(restDay => restDay.date.split('T')[0]);
  const mappedYear = thisYear.map(date => {
    if (mappedRuns.includes(date.toJSON().split('T')[0])) {
      return { date: date.toJSON().split('T')[0], runStatus: 'run' };
    } else if (mappedRestData.includes(date.toJSON().split('T')[0])) {
      return { date: date.toJSON().split('T')[0], runStatus: 'rest' };
    } else if (format(date, 'EEEE') === weeklyRestDay) {
      return { date: date.toJSON().split('T')[0], runStatus: 'rest' };
    } else {
      return { date: date.toJSON().split('T')[0], runStatus: 'norun' };
    }
  });
  return mappedYear;
}
