import { subDays, eachDayOfInterval, format, isAfter } from 'date-fns';
import { convertToMiles, getWeeklySumData } from './index';

export default function getWeeklyLineData(runData) {
  // Grab and format the last week of days -- prefill with 0.00 distance for chart formatting
  const thisWeek = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date()
  });
  const mappedWeek = thisWeek.map(date => {
    return {
      date: format(date, 'LL' + '/' + 'dd'),
      distance: 0.00
    };
  });

  // If there are no runs within the last week, return the array with 0.00 distances
  if (runData.runDates.length === 0) {
    const weeklySumData = {
      distance: 0,
      duration: { hours: 0, minutes: 0, seconds: 0 }
    };
    return { mappedWeek, weeklySumData };
  }

  // If there are runs, grab the last week of runs from the larger array and ensure they're all in miles and formatted correctly
  const oneWeekBack = subDays(new Date(), 7).toJSON().split('T')[0];
  const filteredRuns = runData.runDates.filter(run => {
    return isAfter(new Date(run.date.split('T')[0]), new Date(oneWeekBack));
  });
  const filteredRunsInMiles = filteredRuns.map(run => {
    if (run.distanceUnits !== 'miles') {
      run = convertToMiles(run);
    }
    return {
      date: run.date.split('T')[0].split('-').slice(1, 3).join('/'),
      distance: run.distance,
      duration: run.duration
    };
  });

  // Iterate through filtered runs and add each distance to the correct day in mappedWeek
  for (let i = 0; i < filteredRunsInMiles.length; i++) {
    for (let j = 0; j < mappedWeek.length; j++) {
      if (filteredRunsInMiles[i].date === mappedWeek[j].date) {
        mappedWeek[j].distance += filteredRunsInMiles[i].distance;
      }
    }
  }
  const weeklySumData = getWeeklySumData(filteredRunsInMiles);
  return { mappedWeek, weeklySumData };
}
