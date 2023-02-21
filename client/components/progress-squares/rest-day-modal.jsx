import React from 'react';
import DatePicker from 'react-datepicker';
import RestDays from './rest-days';
import { subYears } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';
import WeekdaySelector from '../inputs/weekday-selector';

export default function RestDayModal(props) {
  const { closeModal, restData } = props;
  return (
    <div onClick={event => { if (event.target.id === 'background') { closeModal(); } }} id="background" className="w-full overflow-y-scroll h-screen fixed flex justify-center items-center top-0 left-0 bg-gray-800 bg-opacity-30 z-10">
      <div className="absolute tall:relative bg-white rounded-xl p-6 max-w-xl min-w-[260px] w-[85%] top-10 tall:top-0 ml-6 mr-6">
        <button onClick={closeModal} className="absolute -top-4 -right-5 w-10 h-10 rounded-full bg-red-600 text-white"><i className="fa-regular fa-xl fa-circle-xmark" /></button>
        {/* content */}
        <div className="pl-1 mt-2">

          {/* content-header */}
          <div className="mb-4">
            <div className="flex justify-between items-center relative mb-1">
              <h1 className="font-lora text-xl font-bold">Rest Days</h1>
            </div>
          </div>

          {/* content-main */}
          <div className="font-roboto text-md max-w-lg mb-4">
            <div className="mb-4 flex flex-col gap-4">
              <WeekdaySelector />
              <div className="w-full flex flex-col gap-4">
                <section>
                  <RestDays restData={restData}/>
                </section>
                <section>
                  <DatePicker className="w-full rounded-lg px-3 py-3.5 border border-gray-300 focus:outline-blue-500 mb-4 -mt-2" dateFormat='MM/dd/yyy' maxDate={subYears(new Date(), 10)} minDate={subYears(new Date(), 100)} placeholderText='Click to add a custom date.' id='rest-date-picker'/>
                </section>
              </div>
            </div>
          </div>
          <div className="font-roboto text-md max-w-lg mb-4">
            <p>Save</p>
          </div>
        </div>
      </div>
    </div>
  );
}
