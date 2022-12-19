import React from 'react';
import { format } from 'date-fns';

export default function WorkoutCard(props) {
  return (
    <section className="font-caveat bg-blue-200 pt-3 pb-3 pl-4 pr-4 rounded-lg border border-gray-500 x2s:text-lg">
      <div className="mb-1.5 flex flex-col gap-[2px]">
        <h1 className="text-lg x2s:text-2xl">Monday, Dec 19th</h1>
        <p>Weekly long run @ Eagle Creek Park</p>
      </div>
      <hr className="border border-gray-600 mb-3"/>
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-temperature-high text-red-400 text-lg" />
          <p>2 mi  |  8:30 / mile</p>
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-fire text-red-700 text-lg" />
          <p>4 km  |  4 x 1k @ 3:20 / k</p>
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-temperature-low text-blue-400 text-lg" />
          <p>1 mi  |  EZ jog</p>
        </div>
      </div>
    </section>
  );
}
