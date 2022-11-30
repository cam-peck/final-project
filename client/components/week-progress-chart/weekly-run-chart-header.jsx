import React from 'react';

export default function WeeklyRunChartHeader(props) {
  const { distance, duration } = props.data;
  return (
    <div className="flex flex-col gap-1 font-lora ">
      <h1 className="text-xl font-medium">This week</h1>
      <div className="flex gap-2">
        <p>{distance} {distance === 1 ? 'mile' : 'miles'}</p>
        <span> | </span>
        <p>{duration.hours} {duration.hours === 1 ? 'hr' : 'hrs'} {duration.minutes} min</p>
      </div>
    </div>
  );
}
