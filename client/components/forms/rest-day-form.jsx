import React, { useState } from 'react';
import { addYears, subYears, formatISO } from 'date-fns';
import WeekdaySelector from '../inputs/weekday-selector';
import CustomRestDays from '../progress-squares/custom-rest-days';
import DatePicker from 'react-datepicker';

export default function RestDayForm(props) {
  const [restData, setRestData] = useState(props.restData);
  const [weeklyRestDay, setWeeklyRestDay] = useState('None');
  const [customRestDay, setCustomRestDay] = useState(undefined);
  const [restDayDuplicateError, setRestDayDuplicateError] = useState(false);
  const addCustomRestDay = event => {
    const isoDate = formatISO(customRestDay);
    if (restData.find(restDay => restDay.date.split('T')[0] === isoDate.split('T')[0])) { // TODO: add error handling here for duplicates!
      setRestDayDuplicateError(true);
    } else {
      const newRestDay = {
        date: isoDate.split('T')[0] + 'T00:00:00.000Z',
        isCustom: true,
        isWeekly: false
      };
      const newRestData = restData.slice();
      newRestData.push(newRestDay);
      setRestData(newRestData);
      setRestDayDuplicateError(false);
    }
  };
  const submitForm = event => {
    event.preventDefault();
    console.log('Form Submitted');
  };
  const { closeModal } = props;
  return (
    <form className="flex flex-col gap-4" onSubmit={ event => submitForm(event) }>
      <div>
        <WeekdaySelector value={weeklyRestDay} onChange={event => setWeeklyRestDay(event.target.value) }/>
      </div>
      <div className='flex flex-col gap-2 mb-2'>
        <div>
          <p className="font-lora font-medium text-md mb-2">Custom Rest Days</p>
          <CustomRestDays restData={restData}/>
        </div>
        <div className="flex">
          <DatePicker selected={customRestDay} onChange={date => setCustomRestDay(date)} className={`w-full rounded-tl-lg rounded-bl-lg px-3 py-3.5 border border-r-0 ${restDayDuplicateError ? 'border-red-500' : 'border-gray-300'} focus:outline-blue-500`} dateFormat='MM/dd/yyy' maxDate={addYears(new Date(), 10)} minDate={subYears(new Date(), 100)} placeholderText='Click to add a custom date.' id='rest-date-picker' />
          <button onClick={event => addCustomRestDay(event.target.value)} className={`w-4/12 border border-l-0 ${restDayDuplicateError ? 'border-red-500' : 'border-blue-300'} bg-blue-500 text-white text-xl rounded-tr-lg rounded-br-lg`} type="button">+</button>
        </div>
        { restDayDuplicateError ? <p className='text-red-500 italic font-lora pl-0.5 text-sm'>That date has already been added.</p> : '' }
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={closeModal} className="w-1/2 x2s:w-1/4 bg-red-500 transition-colors ease-in-out duration-300 hover:bg-red-600 text-white p-3 rounded-lg font-bold mb-2">Cancel</button>
        <button type="submit" className="w-1/2 x2s:w-3/4 bg-blue-500 transition-colors ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold mb-2">Save</button>
      </div>
    </form>
  );
}
