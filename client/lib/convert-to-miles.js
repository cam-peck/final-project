export default function convertToMiles(runToConvert) { // { distance: x, distanceUnits: y }
  const mileConversions = { // for 1 mile //
    yards: 1760,
    kilometers: 1.609, // not perfect --> 3 decimals or so of precision
    meters: 1609 // same precision as km
  };
  const convertedDistance = Number((runToConvert.distance / mileConversions[`${runToConvert.distanceUnits}`]).toFixed(2));
  runToConvert.distance = convertedDistance;
  runToConvert.distanceUnits = 'miles';
  return runToConvert;
}
