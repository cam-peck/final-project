import React from 'react';
import DistanceInput from './distance-input';
import TextInput from './text-input';

export default function WorkoutFieldset(props) {
  const { legendLabel, distanceName, distanceValue, paceName, paceValue, onChange } = props;

  return (
    <fieldset className="border border-2 border-blue-300 rounded-lg p-5">
      <legend className="font-lora font-md text-lg x2s:text-xl font-medium p-2 bg-blue-200 rounded-md">{legendLabel}</legend>
      <section className="md:flex md:gap-6">
        <div className="w-full md:w-1/2">
          <DistanceInput name={distanceName} value={distanceValue} onChange={onChange}/>
        </div>
        <div className="w-full md:w-1/2">
          <TextInput type="text" name={paceName} value={paceValue} placeholder='8:30 / mile' showLabel={true} label='Goal Pace' onChange={onChange} />
        </div>
      </section>
    </fieldset>
  );
}
