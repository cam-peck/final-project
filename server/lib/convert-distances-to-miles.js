function convertDistancesToMiles(distanceArray) { // { distance: x, distanceUnits: y }
  for (let i = 0; i < distanceArray.length; i++) {
    if (distanceArray[i].distanceUnits !== 'miles') {
      const mileConversions = { // for 1 mile //
        yards: 1760,
        kilometers: 1.609, // not perfect --> 3 decimals or so of precision
        meters: 1609 // same precision as km
      };
      const convertedDistance = Number((distanceArray[i].distance / mileConversions[`${distanceArray[i].distanceUnits}`]).toFixed(2));
      distanceArray[i].distance = convertedDistance;
      distanceArray[i].distanceUnits = 'miles';
    }
  }
  return distanceArray;
}

module.exports = convertDistancesToMiles;
