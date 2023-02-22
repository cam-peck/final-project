import React, { useState } from 'react';
import { addYears, subYears, formatISO } from 'date-fns';
import WeekdaySelector from '../inputs/weekday-selector';
import CustomRestDays from '../progress-squares/custom-rest-days';
import DatePicker from 'react-datepicker';

export default function RestDayForm(props) {
  const [restData, setRestData] = useState(props.restData);
  const [weeklyRestDay, setWeeklyRestDay] = useState('None');
  const [customRestDay, setCustomRestDay] = useState(undefined);
  const addCustomRestDay = e => {
    const isoDate = formatISO(customRestDay);
    if (!restData.find(restDay => restDay.date.split('T')[0] === isoDate.split('T')[0])) {
      const newRestDay = {
        date: isoDate.split('T')[0] + 'T00:00:00.000Z',
        isCustom: true,
        isWeekly: false
      };
      const newRestData = restData.slice();
      newRestData.push(newRestDay);
      setRestData(newRestData);
    }
  };
  return (
    <section className="flex flex-col gap-4">
      <div>
        <WeekdaySelector value={weeklyRestDay} onChange={event => setWeeklyRestDay(event.target.value) }/>
      </div>
      <div className='flex flex-col gap-2'>
        <div>
          <p className="font-lora font-medium text-md mb-2">Custom Rest Days</p>
          <CustomRestDays restData={restData}/>
        </div>
        <div className="flex">
          <DatePicker selected={customRestDay} onChange={date => setCustomRestDay(date)} className="w-full rounded-tl-lg rounded-bl-lg px-3 py-3.5 border border-r-0 border-gray-300 focus:outline-blue-500" dateFormat='MM/dd/yyy' maxDate={addYears(new Date(), 10)} minDate={subYears(new Date(), 100)} placeholderText='Click to add a custom date.' id='rest-date-picker' />
          <button onClick={event => addCustomRestDay(event.target.value)} className="w-4/12 border border-l-0 border-blue-300 bg-blue-500 text-white text-xl rounded-tr-lg rounded-br-lg" type="button">+</button>
        </div>
      </div>
    </section>
  );
}
