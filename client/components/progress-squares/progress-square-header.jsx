import React from 'react';

export default function ProgressSquareHeader(props) {
  const { sumData, toggleRestDayModal } = props;
  const { yearSum, monthSum } = sumData;
  return (
    <div className="font-lora mb-4 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium">
          {monthSum} {monthSum === 1 ? 'run' : 'runs'} this month
        </p>
        <i className="fa-solid fa-gear pr-[2px] hover:cursor-pointer" />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg">
          {yearSum} {yearSum === 1 ? 'run' : 'runs'} this year
        </p>
        <i onClick={toggleRestDayModal} className="fa-solid fa-couch hover:cursor-pointer" />
      </div>
    </div>
  );
}
