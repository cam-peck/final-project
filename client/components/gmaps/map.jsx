import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import RunRouteMap from './run-route-map';
import LoadingSpinner from '../loading-spinner';

export default function Map(props) {
  const { gpxPath } = props;
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: 'AIzaSyDkrB7ZtGx7RFAtFg4VRdOhRHHbJ3vNn_M'
  });

  if (!isLoaded) return <LoadingSpinner />;
  return <RunRouteMap gpxPath={gpxPath}/>;
}
