import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../lib';
import { addYears, subYears, formatISO } from 'date-fns';
import WeekdaySelector from '../inputs/weekday-selector';
import CustomRestDays from '../progress-squares/custom-rest-days';
import DatePicker from 'react-datepicker';

export default function RestDayForm(props) {

  // State Data //
  const [newRestDays, setNewRestDays] = useState([]); // tracks newly added days only
  const [restData, setRestData] = useState([]); // tracks all rest days
  const [weeklyRestDay, setWeeklyRestDay] = useState('None'); // stores a day of the week
  const [customRestDay, setCustomRestDay] = useState(undefined); // stores the current data on the date input
  const [restDayDuplicateError, setRestDayDuplicateError] = useState(false);

  // Context Data & Props //
  const { user } = useContext(AppContext);
  const { closeModal, setFetchingData, toggleNetworkError } = props;

  // Assist Functions //
  useEffect(() => {
    async function fetchRestData() {
      const restDataReq = {
        method: 'GET',
        headers: {
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      const weeklyRestDayReq = {
        method: 'GET',
        headers: {
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      try {
        const restDataResponse = await fetch('api/restDays', restDataReq);
        const restDataResult = await restDataResponse.json();
        const weeklyRestDayResponse = await fetch('api/profile', weeklyRestDayReq);
        const weeklyRestDayResult = await weeklyRestDayResponse.json();
        setRestData(restDataResult);
        setWeeklyRestDay(weeklyRestDayResult.weeklyRestDay);
        setFetchingData(false);
      } catch (err) {
        console.error('An error occured!', err);
        toggleNetworkError();
      }
    }
    setFetchingData(true);
    fetchRestData();
  }, [user, setFetchingData, toggleNetworkError]);

  const addCustomRestDay = event => {
    const isoDate = formatISO(customRestDay);
    if (restData.find(restDay => restDay.date.split('T')[0] === isoDate.split('T')[0])) { // TODO: add error handling here for duplicates!
      setRestDayDuplicateError(true);
    } else {
      const newRestDay = {
        date: isoDate.split('T')[0] + 'T00:00:00.000Z'
      };
      const newRestData = restData.slice();
      newRestData.unshift(newRestDay);
      newRestDays.push(newRestDay);
      setRestData(newRestData);
      setNewRestDays(newRestDays);
      if (restDayDuplicateError) setRestDayDuplicateError(false);
    }
  };

  const submitForm = async event => {
    event.preventDefault();
    setFetchingData(true);
    if (newRestDays.length !== 0) {
      const body = JSON.stringify({
        newRestDays
      });
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user,
        body
      };
      try {
        await fetch('api/restDays', req);
        setFetchingData(false);
      } catch (err) {
        console.error('An error occured!', err);
        toggleNetworkError();
      }
    }
    const body = JSON.stringify({
      weeklyRestDay
    });
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      user,
      body
    };
    try {
      await fetch('api/profile/weeklyRestDay', req);
      setFetchingData(false);
    } catch (err) {
      console.error('An error occured!', err);
      toggleNetworkError();
    }
    closeModal();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={ event => submitForm(event) }>
      <div>
        <WeekdaySelector value={weeklyRestDay} onChange={event => setWeeklyRestDay(event.target.value) }/>
      </div>
      <div className='flex flex-col gap-2 mb-2'>
        <p className="font-lora font-medium text-md mb-2">Custom Rest Days</p>
        <div className="max-h-40 overflow-y-scroll mb-2">
          <CustomRestDays restData={restData}/>
        </div>
        <div className="flex">
          <DatePicker selected={customRestDay} onChange={date => setCustomRestDay(date)} className={`w-full rounded-tl-lg rounded-bl-lg px-3 py-3.5 border border-r-0 ${restDayDuplicateError ? 'border-red-500' : 'border-gray-300'} focus:outline-blue-500`} dateFormat='MM/dd/yyy' maxDate={addYears(new Date(), 10)} minDate={subYears(new Date(), 100)} placeholderText='Click to add a custom date.' id='rest-date-picker' autoComplete="false"/>
          <button onClick={event => addCustomRestDay(event.target.value)} className={`w-4/12 border border-l-0 ${restDayDuplicateError ? 'border-red-500' : 'border-blue-300'} bg-blue-500 text-white text-xl rounded-tr-lg rounded-br-lg`} type="button">+</button>
        </div>
        { restDayDuplicateError ? <p className='text-red-500 italic font-lora pl-0.5 text-sm'>That date has already been added.</p> : '' }
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={closeModal} className="w-1/2 sm:w-1/4 bg-red-500 transition-colors ease-in-out duration-300 hover:bg-red-600 text-white p-3 rounded-lg font-bold mb-2">Cancel</button>
        <button type="submit" className="w-1/2 sm:w-1/4 bg-blue-500 transition-colors ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold mb-2">Save</button>
      </div>
    </form>
  );
}
