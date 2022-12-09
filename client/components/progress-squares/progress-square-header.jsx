import React from 'react';

export default function ProgressSquareHeader(props) {
  const { data } = props;
  const { yearSum, monthSum } = data;
  return (
    <div className="font-lora mb-4 flex flex-col gap-1">
      <p className="text-xl font-medium">
        {monthSum} {monthSum === 1 ? 'run' : 'runs'} this month
      </p>
      <p className="text-lg">
        {yearSum} {yearSum === 1 ? 'run' : 'runs'} this year
      </p>
    </div>
  );
}
