import React from 'react';
import { calculatePace, removeTz } from '../../lib';
import NoGpxFound from '../gmaps/no-gpx-found';
import { format } from 'date-fns';

export default function RunMiniCard(props) {

  const { date, distance, distanceUnits, duration, entryId, gpxData, openModal } = props;
  const splitDuration = duration.split(':');
  const pace = calculatePace(distance, distanceUnits, splitDuration[0], splitDuration[1], splitDuration[2]);
  const dtDateOnly = removeTz(date);
  const formattedDate = format(new Date(dtDateOnly), 'MMMM do, yyyy');
  return (
    <div className="w-full bg-blue-800 text-white flex justify-between items-center rounded-xl mb-6 shadow-lg hover:cursor-pointer p-2 x2s:p-0" onClick={() => { openModal(entryId); }}>
      <div className="flex items-center gap-4">
        <div className="w-12 xs:w-14 md:w-16 ml-1.5 x2s:ml-4 pt-4 pb-4 x2s:pt-0 x2s:pb-0">
          <img className="rounded-full p-1.5 border-black bg-white border-2" src="/images/run-shoe.png" alt="" />
        </div>
        <div className="flex flex-col gap-2 font-roboto">
          <h2 className="font-medium text-md md:text-lg">{formattedDate}</h2>
          <p><span className="text-sm x2s:text-md pr-2">{`${distance} ${distanceUnits}`}</span>
            |
            <span className="pl-2 text-sm x2s:text-md">{pace}</span>
          </p>
        </div>
      </div>
      <div className="hidden x2s:block x2s:w-28">
        {
          gpxData !== null
            ? <iframe
              width="100%"
              height='120px'
              frameBorder="0"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/view?key=${process.env.GMAPS_API_KEY}&center=${gpxData[0].lat},${gpxData[0].lng}&zoom=10`}
              />
            : < NoGpxFound height="h-[120px]" borderRounded="rounded-tr-lg rounded-br-lg" width="w-full" textSize="text-[12px]"/>
        }

      </div>
    </div>
  );
}
