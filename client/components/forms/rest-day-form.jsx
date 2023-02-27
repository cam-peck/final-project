import React, { useState, useContext } from 'react';
import { AppContext } from '../../lib';
import { addYears, subYears, formatISO } from 'date-fns';
import WeekdaySelector from '../inputs/weekday-selector';
import CustomRestDays from '../progress-squares/custom-rest-days';
import DatePicker from 'react-datepicker';

export default function RestDayForm(props) {

  const { closeModal, setFetchingData, toggleNetworkError, restData, setRestData, weeklyRestDay, setWeeklyRestDay } = props;

  // State Data //
  const [tempRestData, setTempRestData] = useState(restData); // tracks newly added days only
  const [tempDeletedDays, setTempDeletedDays] = useState([]);
  const [tempWeeklyRestDay, setTempWeeklyRestDay] = useState(weeklyRestDay);
  const [newRestDays, setNewRestDays] = useState([]); // tracks newly added days
  const [customRestDay, setCustomRestDay] = useState(undefined); // stores the current data on the date input
  const [restDayDuplicateError, setRestDayDuplicateError] = useState(false);

  // Context Data & Props //
  const { user } = useContext(AppContext);

  // Assist Functions //
  const addCustomRestDay = event => {
    const isoDate = formatISO(customRestDay);
    // Check if the day has already been added //
    if (tempRestData.find(restDay => restDay.date.split('T')[0] === isoDate.split('T')[0])) {
      setRestDayDuplicateError(true);
    } else {
      let newRestDay;
      // Check if day was deleted and then readded AND was already in DB
      const readdedSavedDay = restData.filter(savedDay => savedDay.date.split('T')[0] === isoDate.split('T')[0]);
      if (readdedSavedDay.length !== 0) {
        // Remove the day from deleted becayse we readded it //
        const indexToDelete = tempDeletedDays.findIndex(deletedDay => deletedDay.date.split('T')[0] === readdedSavedDay[0].date.split('T')[0]);
        const newTempDeletedDays = tempDeletedDays.slice();
        newTempDeletedDays.splice(indexToDelete, 1);
        setTempDeletedDays(newTempDeletedDays);
        newRestDay = readdedSavedDay[0];
      } else {
        newRestDay = {
          date: isoDate.split('T')[0] + 'T00:00:00.000Z'
        };
      }
      const newTempRestData = tempRestData.slice();
      newTempRestData.unshift(newRestDay);
      setTempRestData(newTempRestData);
      // Add the new rest day to new rest days for submit later if it isn't already in the db //
      if (readdedSavedDay.length === 0) {
        const newTempNewRestDays = newRestDays.slice();
        newTempNewRestDays.push(newRestDay);
        setNewRestDays(newTempNewRestDays);
      }
      // Cleanup duplicates error if it existed previously
      if (restDayDuplicateError) setRestDayDuplicateError(false);
    }
  };

  const deleteRestDay = (restIndexToDelete, restObjToDelete) => {
    // Check if the deleted day was a newly added day //
    const newRestDaysIndexToRemove = newRestDays.findIndex(restDay => restObjToDelete.date.split('T')[0] === restDay.date.split('T')[0]);
    // Remove from new rest days //
    if (newRestDaysIndexToRemove !== -1) {
      const newRestDaysCopy = newRestDays.slice();
      newRestDaysCopy.splice(newRestDaysIndexToRemove, 1);
      setNewRestDays(newRestDaysCopy);
    }
    const newTempRestData = tempRestData.slice();
    newTempRestData.splice(restIndexToDelete, 1);
    setTempRestData(newTempRestData);
    // Add to the deleted array unless it was a newly added day //
    if (newRestDaysIndexToRemove === -1) {
      const newTempDeletedDays = tempDeletedDays.slice();
      newTempDeletedDays.push(restObjToDelete);
      setTempDeletedDays(newTempDeletedDays);
    }
  };

  const submitForm = async event => {
    event.preventDefault();
    setFetchingData(true);
    if (tempDeletedDays.length !== 0) {
      const body = JSON.stringify({
        tempDeletedDays
      });
      const req = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user,
        body
      };
      try {
        await fetch('api/restDays', req);
        setRestData(tempRestData); // update parent progress component with new data
        setFetchingData(false);
      } catch (err) {
        console.error('An error occured!', err);
        toggleNetworkError();
      }
    }
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
        setRestData(tempRestData); // update parent progress component with new data
        setFetchingData(false);
      } catch (err) {
        console.error('An error occured!', err);
        toggleNetworkError();
      }
    }
    const body = JSON.stringify({
      tempWeeklyRestDay
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
      setWeeklyRestDay(tempWeeklyRestDay); // update parent progress component with new data
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
        <WeekdaySelector value={tempWeeklyRestDay} onChange={event => setTempWeeklyRestDay(event.target.value) }/>
      </div>
      <div className='flex flex-col gap-2 mb-2'>
        <p className="font-lora font-medium text-md mb-2">Custom Rest Days</p>
        <div className="max-h-40 overflow-y-scroll mb-2">
          <CustomRestDays restData={tempRestData} deleteRestDay={deleteRestDay}/>
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
