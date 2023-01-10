import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import RunRouteMap from './run-route-map';
import LoadingSpinner from '../loading-spinner';

export default function Map(props) {
  const { gpxPath } = props;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAq_9iRADDdUQeorMC-jUYATyjoE4y76d8'
  });

  if (!isLoaded) return <LoadingSpinner />;
  return <RunRouteMap gpxPath={gpxPath}/>;
}
