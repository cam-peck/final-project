import React from 'react';

export default function DistanceInput(props) {
  return (
    <fieldset className="flex pl-4 pr-4">
      <legend>Distance</legend>
      <div className="w-full">
        <input type="number" name="distance" min="0.01" max="999" value={props.value} onChange={props.onChange} className="w-full px-3 py-4 text-center border border-gray-300 text-gray-900 rounded-tl-lg rounded-bl-lg" placeholder="0.00" required />
      </div>
      <div className="w-32 flex-shrink-0">
        <select className="w-full bg-white border border-gray-400 hover:border-gray-500 px-3 py-4 rounded-tr-lg rounded-br-lg shadow focus:outline-none focus:shadow-outline">
          <option>miles</option>
          <option>yards</option>
          <option>kilometers</option>
          <option>meters</option>
        </select>
      </div>
    </fieldset>
  );
}
