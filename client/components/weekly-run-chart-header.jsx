import React from 'react';

export default function WeeklyRunChartHeader(props) {
  return (
    <div className="flex flex-col gap-1 font-lora ">
      <h1 className="text-xl font-medium">This week</h1>
      <div className="flex gap-2">
        <p>16.4 miles</p>
        <span> | </span>
        <p>2h 52m</p>
        <span> | </span>
        <p>381ft</p>
      </div>
    </div>
  );
}
