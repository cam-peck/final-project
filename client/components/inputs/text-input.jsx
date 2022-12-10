import React from 'react';

export default function TextInput(props) {
  const showLabel = props.showLabel
    ? ''
    : 'hidden';
  const { type, name, value, placeholder, label, disabled, onChange } = props;
  return (
    <div className="mb-4 flex flex-col">
      <label className={`${showLabel} font-lora font-medium text-md pb-2`} htmlFor={name}>{label}</label>
      <input autoComplete="on" type={type} name={name} id={name} value={value} onChange={onChange} className="w-full rounded-lg px-3 py-3.5 border border-gray-300 focus:outline-blue-500" placeholder={placeholder} disabled={disabled} required />
    </div>
  );
}
