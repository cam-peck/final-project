import React from 'react';

export default function ProgressSquareHeader(props) {
  const { yearSumData, monthSumData } = props;
  return (
    <div>
      <p className="font-lora text-lg font-medium mb-4">
        {yearSumData.yearRunCount} {yearSumData.yearRunCount > 1 ? 'runs' : 'run'} this month |
        {monthSumData.monthRunCount} {monthSumData.monthRunCount > 1 ? 'runs' : 'run'} this year</p>
    </div>
  );
}
