import React from 'react';

export default function DurationInput(props) {
  const { onHourChange, onMinuteChange, onSecondChange, secondValue, minuteValue, hourValue } = props;
  return (
    <fieldset className="flex gap-2 mb-4">
      <legend className="font-lora font-md text-md font-medium pb-2">Duration</legend>
      {/* Hours */}
      <div className="flex flex-grow">
        <input type="number" name="durationHours" value={hourValue} onChange={event => onHourChange(event.target.value)} min="0" max="99" id="first_name" className="w-full text-center border border-gray-300 focus:outline-blue-500 text-gray-900 rounded-lg rounded-r-none px-3 py-3.5" placeholder="00" disabled={props.disabled} data-testid="runs-hours-input" required />
        <h1 className="bg-blue-500 text-white rounded-tr-lg rounded-br-lg flex items-center px-1.5 xxs:px-3 py-3.5">hrs</h1>
      </div>
      {/* Minutes */}
      <div className="flex flex-grow">
        <input type="number" name="durationMinutes" min="0" max="59" value={minuteValue} onChange={event => onMinuteChange(event.target.value)} className="w-full text-center border border-gray-300 focus:outline-blue-500 text-gray-900 rounded-lg rounded-r-none px-3 py-3.5" placeholder="40" disabled={props.disabled} data-testid="runs-minutes-input" required />
        <h1 className="bg-blue-500 text-white rounded-tr-lg rounded-br-lg flex items-center px-1.5 xxs:px-3 py-3.5">min</h1>
      </div>
      {/* Seconds */}
      <div className="flex flex-grow">
        <input type="number" name="durationSeconds" min="0" max="59" value={secondValue} onChange={event => onSecondChange(event.target.value)} className="w-full text-center border border-gray-300 focus:outline-blue-500 text-gray-900 rounded-lg rounded-r-none px-3 py-3.5" placeholder="00" disabled={props.disabled} data-testid="runs-seconds-input" required />
        <h1 className="bg-blue-500 text-white rounded-tr-lg rounded-br-lg flex items-center px-1.5 xxs:px-3 py-3.5">sec</h1>
      </div>
    </fieldset>
  );
}
