import React from 'react';

export default function WeekdaySelector(props) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="font-lora font-medium text-md" htmlFor='weekly-rest'> Weekly Rest Day</label>
      <select name='weekly-rest' value='test' className="w-full bg-white border border-gray-400 hover:border-gray-500 px-3 h-[54px] rounded-lg shadow focus:outline-none focus:shadow-outline">
        <option>None</option>
        <option>Sunday</option>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
      </select>
    </div>
  );
}
