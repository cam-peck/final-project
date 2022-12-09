import React from 'react';

export default function DurationInput(props) {
  return (
    <fieldset className="flex gap-2 mb-4">
      <legend className="font-lora font-md text-md font-medium pb-2">Duration</legend>
      {/* Hours */}
      <div className="flex flex-grow">
        <input type="number" name="durationHours" value={props.value.durationHours} onChange={props.onChange} min="0" max="99" id="first_name" className="w-full text-center border border-gray-300 focus:outline-blue-500 text-gray-900 rounded-lg rounded-r-none px-3 py-3.5" placeholder="00" required />
        <h1 className="bg-blue-500 text-white rounded-tr-lg rounded-br-lg flex items-center px-1.5 xxs:px-3 py-3.5">hrs</h1>
      </div>
      {/* Minutes */}
      <div className="flex flex-grow">
        <input type="number" name="durationMinutes" min="0" max="59" value={props.value.durationMinutes} onChange={props.onChange} className="w-full text-center border border-gray-300 focus:outline-blue-500 text-gray-900 rounded-lg rounded-r-none px-3 py-3.5" placeholder="40" required />
        <h1 className="bg-blue-500 text-white rounded-tr-lg rounded-br-lg flex items-center px-1.5 xxs:px-3 py-3.5">min</h1>
      </div>
      {/* Seconds */}
      <div className="flex flex-grow">
        <input type="number" name="durationSeconds" min="0" max="59" value={props.value.durationSeconds} onChange={props.onChange} className="w-full text-center border border-gray-300 focus:outline-blue-500 text-gray-900 rounded-lg rounded-r-none px-3 py-3.5" placeholder="00" required />
        <h1 className="bg-blue-500 text-white rounded-tr-lg rounded-br-lg flex items-center px-1.5 xxs:px-3 py-3.5">sec</h1>
      </div>
    </fieldset>
  );
}
