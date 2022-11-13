export default function calculatePace(distance, distanceType, hrs, min, sec) { // gets pace / min
  const distanceTypeObj = {
    miles: 'mi',
    yards: 'yd',
    kilometers: 'km',
    meters: 'm'
  };
  const distanceShorthand = distanceTypeObj[distanceType];
  if (distance === '') {
    return `0:00 / ${distanceShorthand}`;
  }
  const hrsInSeconds = hrs * 60 * 60;
  const minutesInSeconds = min * 60;
  const totalSeconds = hrsInSeconds + minutesInSeconds + Number(sec);
  const paceAsInt = (totalSeconds / distance / 60).toFixed(2);
  const paceMinutes = paceAsInt.split('.')[0];
  const paceSeconds = ((paceAsInt.split('.')[1]) * 0.006).toFixed(2).split('.')[1];
  return `${paceMinutes}:${paceSeconds} / ${distanceShorthand}`;
  // return pace;
}
