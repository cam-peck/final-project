import React from 'react';
import { validateTitle, validateDistance, validateDescription, validateDuration } from '../lib';

export default function ValidatedInput(props) {
  let validateResult;
  switch (props.name) {
    case 'title':
      validateResult = validateTitle();
      break;
    case 'description':
      validateResult = validateDescription();
      break;
    case 'duration':
      validateResult = validateDuration();
      break;
    case 'distance':
      validateResult = validateDistance();
      break;
  }
  const errorMessage = validateResult.errorMessage;
  const validateSymbol = validateResult.validateSymbol;
  return (
    <div className="validated-input-container">
      <input autoComplete="on" type={props.type} name={props.name} id={props.name} value={props.value} max="2020-09-10" onChange={props.onChange} className="w-full rounded-lg px-3 py-4 border border-gray-300 focus:outline-blue-500" placeholder={props.placeholder} required />
      <p className="error-message">{errorMessage}</p>
      <i className={`fa-solid fa-${validateSymbol} validator-${validateSymbol}`} />
    </div>
  );
}
