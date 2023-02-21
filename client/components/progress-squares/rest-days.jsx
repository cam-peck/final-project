import React from 'react';
import { removeTz } from '../../lib';
import { format } from 'date-fns';

export default function RestDays(props) {
  const { restData } = props;
  return (
    <>
      <label className="font-lora font-medium text-md" htmlFor='rest-date-picker'>Custom Rest Days</label>
      <div className="grid grid-cols-1 x2s:grid-cols-2 sm:grid-cols-3 gap-3">
        {restData.map(restDay => {
          if (restDay.isCustom) {
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
          } else return '';
        })}
      </div>
    </>
  );
}
