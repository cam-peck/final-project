import React from 'react';

export default function CheckboxInput(props) {
  const { name, value, label, onChange, checked } = props;
  return (
    <div className='pb-2 flex gap-2'>
      <input className="pr-2 w-[16px]" type='checkbox' name={name} id={name} value={value} onChange={onChange} checked={checked}/>
      <label className="font-lora font-medium text-lg" htmlFor={name}>{label}</label>
    </div>
  );
}
