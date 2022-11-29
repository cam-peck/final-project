import React from 'react';

export default function ProgressSquareHeader(props) {
  const { data } = props;
  const { yearSum, monthSum } = data;
  return (
    <div className="font-lora mb-4 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium">
          {monthSum} {monthSum > 1 ? 'runs' : 'run'} this month
        </p>
        <i className="fa-solid fa-gear pr-[2px] hover:cursor-pointer" />
      </div>
      <div className="flex justify-between items-center ">
        <p className="text-lg">
          {yearSum} {yearSum > 1 ? 'runs' : 'run'} this year
        </p>
        <i className="fa-solid fa-couch hover:cursor-pointer" />
      </div>
    </div>
  );
}
