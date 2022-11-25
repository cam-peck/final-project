import React from 'react';

export default function WeeklyRunChartHeader(props) {
  const { distance, distanceUnits, runTime, elevation, elevationUnits } = props.data;
  return (
    <div className="flex flex-col gap-1 font-lora ">
      <h1 className="text-xl font-medium">This week</h1>
      <div className="flex gap-2">
        <p>{distance} {distanceUnits}</p>
        <span> | </span>
        <p>{runTime}</p>
        <span> | </span>
        <p>{elevation} {elevationUnits}</p>
      </div>
    </div>
  );
}
