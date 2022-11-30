export default function getWeeklySumData(lineData) {
  const weeklySumData = {};
  if (lineData.length === 0) { // check for an empty array and return 0's for values
    weeklySumData.distance = 0.00;
    weeklySumData.duration = { hours: 0, minutes: 0, seconds: 0 };
  } else {
    const distance = lineData.reduce((acc, currValue) => { // in miles (hard-coded)
      return acc + currValue.distance;
    }, 0).toFixed(2);

    const duration = lineData.reduce((acc, currValue) => {
      const splitDuration = currValue.duration.split(':');
      acc.hours += Number(splitDuration[0]);
      acc.minutes += Number(splitDuration[1]);
      acc.seconds += Number(splitDuration[2]);
      if (acc.seconds >= 60) {
        acc.minutes += 1;
        acc.seconds -= 60;
      }
      if (acc.minutes >= 60) {
        acc.hours += 1;
        acc.minutes -= 60;
      }
      return acc;
    }, { hours: 0, minutes: 0, seconds: 0 });
    weeklySumData.distance = distance;
    weeklySumData.duration = duration;
  }
  return weeklySumData;
}
