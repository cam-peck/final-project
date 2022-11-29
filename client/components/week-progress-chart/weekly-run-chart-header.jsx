import React from 'react';

export default function WeeklyRunChartHeader(props) {
  if (!props.data) {
    return;
  }
  const { thisWeekDistance, thisWeekDuration } = props.data;
  return (
    <div className="flex flex-col gap-1 font-lora ">
      <h1 className="text-xl font-medium">This week</h1>
      <div className="flex gap-2">
        <p>{thisWeekDistance} {thisWeekDistance === 1 ? 'mile' : 'miles'}</p>
        <span> | </span>
        <p>{thisWeekDuration.hours} {thisWeekDuration.hours === 1 ? 'hr' : 'hrs'} {thisWeekDuration.minutes} min</p>
      </div>
    </div>
  );
}
