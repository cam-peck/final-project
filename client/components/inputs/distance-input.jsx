import React from 'react';

export default function DistanceInput(props) {
  return (
    <fieldset className="flex mb-4">
      <legend className="font-lora font-md text-md font-medium pb-2">Distance</legend>
      <div className="w-full">
        <input type="number" name="distance" min="0.01" max="999" step="0.01" value={props.distanceValue} onChange={props.onChange} className="w-full px-3 py-3.5 text-center border border-gray-300 text-gray-900 rounded-lg rounded-r-none" placeholder="0.00" required />
      </div>
      <div className="w-32 flex-shrink-0">
        <select name="distanceUnits" value={props.distanceTypeValue} onChange={props.onChange} className="w-full bg-white border border-gray-400 hover:border-gray-500 px-3 h-[54px] rounded-tr-lg rounded-br-lg shadow focus:outline-none focus:shadow-outline">
          <option>miles</option>
          <option>yards</option>
          <option>kilometers</option>
          <option>meters</option>
        </select>
      </div>
    </fieldset>
  );
}
