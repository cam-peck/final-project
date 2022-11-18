import React from 'react';

export default function ProgressSquareHeader(props) {
  const { sumData } = props;
  const { yearRunCount, monthRunCount } = sumData;
  return (
    <div className="font-lora text-lg font-medium mb-4 flex gap-2">
      <p>
        {monthRunCount} {monthRunCount > 1 ? 'runs' : 'run'} this month
      </p>
      <span> | </span>
      <p>
        {yearRunCount} {yearRunCount > 1 ? 'runs' : 'run'} this year
      </p>
    </div>
  );
}
