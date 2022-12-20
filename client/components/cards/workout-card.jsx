import React from 'react';
import { format } from 'date-fns';
import { removeTz } from '../../lib';

export default function WorkoutCard(props) {
  const { date, description, warmupDistance, warmupNotes, workoutDistance, warmupDistanceUnits, workoutDistanceUnits, cooldownDistanceUnits, workoutNotes, cooldownDistance, cooldownNotes } = props.data;
  const formattedDate = format(removeTz(date), 'EEEE, LLL do');
  return (
    <section className="font-caveat bg-blue-200 pt-3 pb-3 pl-4 pr-4 rounded-lg border border-gray-400 x2s:text-lg shadow-lg">
      <div className="mb-1.5 flex flex-col gap-[2px]">
        <h1 className="text-lg x2s:text-2xl">{formattedDate}</h1>
        <p>{description}</p>
      </div>
      <hr className="border border-gray-600 mb-3"/>
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-temperature-high text-red-400 text-lg" />
          {
            warmupDistance !== 0
              ? <p>{warmupDistance} {warmupDistance !== 1 ? warmupDistanceUnits : warmupDistanceUnits.slice(0, -1)}  |  {warmupNotes}</p>
              : <p>----- N / A ------</p>
          }

        </div>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-fire text-red-700 text-lg" />
          {
            workoutDistance !== 0
              ? <p>{workoutDistance} {workoutDistance !== 1 ? workoutDistanceUnits : workoutDistanceUnits.slice(0, -1)}  |  {workoutNotes}</p>
              : <p>----- N / A ------</p>
          }
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-temperature-low text-blue-400 text-lg" />
          {
            cooldownDistance !== 0
              ? <p>{cooldownDistance} {cooldownDistance !== 1 ? cooldownDistanceUnits : cooldownDistanceUnits.slice(0, -1)}  |  {cooldownNotes}</p>
              : <p>----- N / A ------</p>
          }
        </div>
      </div>
    </section>
  );
}
