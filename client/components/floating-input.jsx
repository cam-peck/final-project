import React from 'react';

export default function FloatingInput(props) {
  return (
    <div className="pl-4 pr-4 mb-4">
      <label htmlFor={props.name}>{props.name}</label>
      <input autoComplete="on" type={props.type} name={props.name} id={props.name} value={props.value} max="2020-09-10" onChange={props.onChange} className="w-full rounded-lg px-3 py-4 border border-gray-300 focus:outline-blue-500" placeholder={props.placeholder} required />
    </div>
  );
}
