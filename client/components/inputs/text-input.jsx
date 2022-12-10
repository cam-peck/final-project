import React from 'react';

export default function TextInput(props) {
  const showLabel = props.showLabel
    ? ''
    : 'hidden';
  return (
    <div className="mb-4 flex flex-col">
      <label className={`${showLabel} font-lora font-medium text-md pb-2`} htmlFor={props.name}>{props.label}</label>
      <input autoComplete="on" type='text' name={props.name} id={props.name} value={props.value} onChange={props.onChange} className="w-full rounded-lg px-3 py-3.5 border border-gray-300 focus:outline-blue-500" placeholder={props.placeholder} required />
    </div>
  );
}
