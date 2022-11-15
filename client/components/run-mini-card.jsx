import React from 'react';
import { calculatePace, formatDate } from '../lib';

export default function RunMiniCard(props) {
  const { date, distance, distanceUnits, duration } = props;
  const splitDuration = duration.split(':');
  const pace = calculatePace(distance, distanceUnits, splitDuration[0], splitDuration[1], splitDuration[2]);
  const formattedDate = formatDate(date);

  return (
    <div className="w-full bg-blue-800 text-white flex justify-between items-center rounded-xl mb-6">
      <div className="flex items-center gap-6">
        <div className="w-14 ml-4">
          <img className="rounded-3xl" src="/images/placeholder-img-sq.jpg" alt="" />
        </div>
        <div className="flex flex-col gap-2 font-roboto">
          <h2 className="font-medium text-lg">{formattedDate}</h2>
          <p><span className="pr-2">{`${distance} ${distanceUnits}`}</span>
            |
            <span className="pl-2">{pace}</span>
          </p>
        </div>
      </div>
      <div className="w-28">
        <img className="rounded-tr-lg rounded-br-lg" src="/images/placeholder-img-sq.jpg" alt="" />
      </div>
    </div>
  );
}
