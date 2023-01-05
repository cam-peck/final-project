import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, Polyline } from '@react-google-maps/api';
import LoadingSpinner from '../loading-spinner';

export default function RunFormMap() {
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey:
  });

  if (!isLoaded) return <LoadingSpinner />;
  return <TestMap />;
}

function TestMap() {

  const center = useMemo(() => ({ lat: 39.773221, lng: -86.278677 }), []);
  const path = [
    { lat: 39.773221, lng: -86.278677 },
    { lat: 39.770658, lng: -86.283520 },
    { lat: 39.766298, lng: -86.283975 },
    { lat: 39.774586, lng: -86.281190 }
  ];
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    visible: true,
    radius: 30000
  };
  // const length = google.maps.geometry.spherical.computeLength(path);
  // console.log(length, 'meters');
  return (
    <GoogleMap
      zoom={13}
      center={center}
      mapContainerClassName="object-cover w-full h-72 md:h-80 rounded-tr-xl rounded-tl-xl"
    >
      <Marker position={path[0]}/>
      <Marker position={path[path.length - 1]}/>
      <Polyline path={path} options={options}/>
    </GoogleMap>
  );
}
