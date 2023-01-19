import { intervalToDuration, differenceInSeconds, parseISO } from 'date-fns';
import { getLatLonDistanceInKm } from '../lib';

export default function parseGpxData(xmlInput) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlInput, 'text/xml');
  const date = xmlDoc.querySelector('name').textContent.split(' ')[1];
  const trkptData = xmlDoc.querySelectorAll('trkpt');
  const path = [];
  for (let i = 0; i < trkptData.length; i++) {
    const runObj = {};
    runObj.time = trkptData[i].querySelector('time').textContent;
    runObj.elevation = trkptData[i].querySelector('ele').textContent;
    runObj.lat = parseFloat(trkptData[i].getAttribute('lat'));
    runObj.lng = parseFloat(trkptData[i].getAttribute('lon'));
    path.push(runObj);
  }
  const startTime = trkptData[0].querySelector('time').textContent;
  const endTime = trkptData[trkptData.length - 1].querySelector('time').textContent;
  const durationInSeconds = differenceInSeconds(parseISO(endTime), parseISO(startTime));
  const durationObj = intervalToDuration({ start: 0, end: durationInSeconds * 1000 });
  const distance = getLatLonDistanceInKm(path);
  return { date, path, distance, durationObj };
}
