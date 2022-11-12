import React from 'react';

export default function DurationInput(props) {
  return (
    <fieldset className="flex justify-between pl-4 pr-4">
      <legend>Duration</legend>
      {/* Hours */}
      <div className="flex">
        <input type="number" name="durationHours" value={props.value.durationHours} onChange={props.onChange} min="0" max="99" id="first_name" className="w-full text-center border border-gray-300 text-gray-900 text-sm rounded-tl-lg rounded-bl-lg px-3 py-4 " placeholder="00" required />
        <h1 className="bg-blue-500 text-white rounded-tr-lg rounded-br-lg flex items-center px-3 py-4">hrs</h1>
      </div>
      {/* Minutes */}
      <div className="flex">
        <input type="number" name="durationMinutes" min="0" max="99" value={props.value.durationMinutes} onChange={props.onChange} className="w-full text-center border border-gray-300 text-gray-900 text-sm rounded-tl-lg rounded-bl-lg px-3 py-4" placeholder="40" required />
        <h1 className="bg-blue-500 text-white rounded-tr-lg rounded-br-lg flex items-center px-3 py-4">min</h1>
      </div>
      {/* Seconds */}
      <div className="flex">
        <input type="number" name="durationSeconds" min="0" max="99" value={props.value.durationSeconds} onChange={props.onChange} className="w-full text-center border border-gray-300 text-gray-900 text-sm rounded-tl-lg rounded-bl-lg px-3 py-4 " placeholder="00" required />
        <h1 className="bg-blue-500 text-white rounded-tr-lg rounded-br-lg flex items-center px-2">sec</h1>
      </div>
    </fieldset>
  );
}
