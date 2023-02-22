import React, { useState } from 'react';
import { subYears } from 'date-fns';
import WeekdaySelector from '../inputs/weekday-selector';
import CustomRestDays from '../progress-squares/custom-rest-days';
import DatePicker from 'react-datepicker';

export default function RestDayForm(props) {
  const { restData } = props;
  const [restDay, setRestDay] = useState('None');
  return (
    <section className="flex flex-col gap-4">
      <div>
        <WeekdaySelector value={restDay} onChange={event => setRestDay(event.target.value) }/>
      </div>
      <div className='flex flex-col gap-2'>
        <p className="font-lora font-medium text-md">Custom Rest Days</p>
        <CustomRestDays restData={restData}/>
        <DatePicker className="w-full rounded-lg px-3 py-3.5 border border-gray-300 focus:outline-blue-500 mb-4 -mt-2" dateFormat='MM/dd/yyy' maxDate={subYears(new Date(), 10)} minDate={subYears(new Date(), 100)} placeholderText='Click to add a custom date.' id='rest-date-picker' />
      </div>
    </section>
  );
}
