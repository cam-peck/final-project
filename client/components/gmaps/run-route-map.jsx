import React from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import LoadingSpinner from '../loading-spinner';

export default function RunRouteMap(props) {
  const { gpxPath } = props;
  if (!gpxPath) {
    return <LoadingSpinner />;
  }
  const center = gpxPath.length !== 0
    ? { lat: gpxPath[0].lat, lng: gpxPath[0].lng }
    : { lat: 39.7684, lng: -86.1581 };
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    visible: true,
    radius: 30000
  };
  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName="object-cover w-full h-72 md:h-80 rounded-tr-xl rounded-tl-xl"
    >
      <Marker position={gpxPath[0]} />
      <Marker position={gpxPath[gpxPath.length - 1]} />
      <Polyline path={gpxPath} options={options} />
    </GoogleMap>
  );
}
