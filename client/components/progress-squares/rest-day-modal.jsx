import React, { useState } from 'react';
import RestDayForm from '../forms/rest-day-form';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingSpinner from '../loading-spinner';

// TODOs
// 1: Ensure state between rest days modal and progres is linked --> need one source for the data for viewing
// 3: Add delete functionality (or an issue for it) for rest days that are already added -- add a snackbar for confirmation

export default function RestDayModal(props) {
  const [fetchingData, setFetchingData] = useState(false);
  const { closeModal, toggleNetworkError, restData, setRestData, weeklyRestDay, setWeeklyRestDay } = props;

  return (
    <section>
      <div onClick={event => { if (event.target.id === 'background') { closeModal(); } }} id="background" className="w-full overflow-y-scroll h-screen fixed flex justify-center items-center top-0 left-0 bg-gray-800 bg-opacity-30 z-10">
        <div className="absolute tall:relative bg-white rounded-xl p-6 max-w-xl min-w-[260px] w-[85%] top-10 tall:top-0 ml-6 mr-6">
          { fetchingData === true ? <LoadingSpinner /> : ''}
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
                <div className="w-full flex flex-col gap-4">
                  <RestDayForm closeModal={closeModal} restData={restData} setRestData={setRestData} weeklyRestDay={weeklyRestDay} setWeeklyRestDay={setWeeklyRestDay} setFetchingData={setFetchingData} toggleNetworkError={toggleNetworkError}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
