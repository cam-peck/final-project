import React from 'react';
import { format } from 'date-fns';
import { removeTz } from '../../lib/index';

export default function CustomRestDays(props) {
  const { restData } = props;
  return (
    <div className="grid grid-cols-1 x2s:grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
      {restData.map(restDay => {
        const restDate = restDay.date;
        return (
          <div className="flex justify-between items-center border-2 border-blue-900 px-2.5 pr-1 py-1.5 rounded-lg" key={restDate}>
            {/* Date */}
            <div className="pr-2.5">
              {format(new Date(removeTz(restDate)), 'MM/dd/yyyy')}
            </div>
            {/* Delete */}
            <div>
              <span className="fa-stack fa-sm hover:cursor-pointer">
                <i className="fa-regular fa-circle fa-stack-2x text-red-600" />
                <i className="fa-solid fa-xmark fa-stack-1x text-red-600" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
