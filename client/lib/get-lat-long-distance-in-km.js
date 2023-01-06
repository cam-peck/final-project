export default function getLatLonDistanceInKm(coordsArray) {
  const R = 6371;
  let totalDistance = 0;
  for (let i = 0; i < coordsArray.length - 1; i++) {
    const dLat = deg2rad(coordsArray[i + 1].lat - coordsArray[i].lat);
    const dLon = deg2rad(coordsArray[i + 1].lon - coordsArray[i].lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(coordsArray[i].lat)) * Math.cos(deg2rad(coordsArray[i + 1].lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    totalDistance += d;
  }
  return Math.round(totalDistance * 100) / 100;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
