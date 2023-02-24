import React, { useState, useEffect, useRef } from 'react';
import ProgressSquare from './progress-square';
import ProgressSquareHeader from './progress-square-header';
import RestDayModal from './rest-day-modal';
import { formatRunningSquares, getSquaresSumData } from '../../lib';

export default function ProgressSquares(props) {

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [restMenuIsOpen, setRestMenuIsOpen] = useState(false);

  const ref = useRef(null);

  const { runData, toggleNetworkError, restData, setRestData, weeklyRestDay, setWeeklyRestDay } = props;
  const runningSquareData = formatRunningSquares(runData, restData);
  const runningSquareSumData = getSquaresSumData(runData);

  useEffect(() => {
    ref.current.scrollLeft = ref.current.scrollWidth;
  }, []);

  const setMouseDown = event => {
    setIsDown(true);
    setStartX(event.pageX);
    setScrollLeft(ref.current.scrollLeft);
  };

  const setMouseUp = () => {
    setIsDown(false);
  };

  const drag = event => {
    if (!isDown) return;
    event.preventDefault();
    const walk = event.pageX - startX;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const toggleRestDayModal = () => {
    setRestMenuIsOpen(!restMenuIsOpen);
  };

  return (
    <div className="bg-white pl-6 pr-6 pt-5 pb-3 rounded-xl border border-gray-300 shadow-sm">
      <ProgressSquareHeader sumData={runningSquareSumData} toggleRestDayModal={toggleRestDayModal}/>
      {
        restMenuIsOpen === true
          ? <RestDayModal restData={restData} setRestData={setRestData} weeklyRestDay={weeklyRestDay} setWeeklyRestDay={setWeeklyRestDay} closeModal={toggleRestDayModal} toggleNetworkError={toggleNetworkError} />
          : ''
      }
      <hr className="border"/>
      <div ref={ref} onMouseDown={event => setMouseDown(event)} onMouseUp={setMouseUp} onMouseMove={event => drag(event)} onMouseLeave={setMouseUp} className="overflow-scroll active:cursor-grabbing active:scale-[1.01]">
        <div className="flex">
          <div className="flex flex-col justify-evenly gap-2 items-center mr-4 mt-11">
            <h1>Mon</h1>
            <h1>Wed</h1>
            <h1>Fri</h1>
          </div>
          <div className="grid grid-52 gap-2.5 relative mt-11 pb-2">
            { runningSquareData.map((square, index) => { return <ProgressSquare key={square.date} square={square} index={index}/>; }) }
          </div>
        </div>
      </div>
    </div>
  );
}
