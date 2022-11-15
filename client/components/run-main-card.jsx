import React from 'react';
import { calculatePace, formatDate } from '../lib';

export default class RunMainCard extends React.Component {
  render() {
    const { title, date, description, distance, distanceUnits, duration, closeModal } = this.props;
    const splitDuration = duration.split(':');
    const pace = calculatePace(distance, distanceUnits, splitDuration[0], splitDuration[1], splitDuration[2]);
    const formattedDate = formatDate(date);
    return (
      <div onClick={event => { if (event.target.id === 'background') { closeModal(); } }} id="background" className="w-full h-screen fixed flex justify-center items-center top-0 left-0 bg-gray-800 bg-opacity-30">
        <div className="relative bg-white rounded-xl p-6 max-w-2xl ml-6 mr-6">
          <button onClick={closeModal} className="absolute -top-4 -right-5 w-10 h-10 rounded-full bg-red-600 text-white"><i className="fa-regular fa-xl fa-circle-xmark" /></button>
          {/* hero-img */}
          <div className="mb-6">
            <img className="w-full h-56 xxs:h-64 xs:h-80 object-cover rounded-xl" src="/images/placeholder-map.png" alt="" />
          </div>
          {/* content */}
          <div className="pl-1">
            {/* content-header */}
            <div className="mb-4">
              <h1 className="font-lora text-xl font-bold">{title}</h1>
              <p className="flex-col xs:flex-row flex gap-1 font-lora">
                <span>{formattedDate}</span>  |
                <span>{distance} {distanceUnits}</span>  |
                <span>{pace}</span>
              </p>
            </div>
            {/* content-main */}
            <div className="font-roboto max-w-lg mb-4">
              <p>{description}</p>
            </div>
          </div>
          {/* tab-menu
          <div className="modal-footer">
            <RunTabs>
              <div label="Notes">
                <p>Notes</p>
              </div>
              <div label="Pace">
                <p>Pace</p>
              </div>
              <div label="Elevation">
                <p>Elevation</p>
              </div>
            </RunTabs>
          </div> */}
        </div>
      </div>
    );
  }
}
