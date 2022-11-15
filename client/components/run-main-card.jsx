import React from 'react';
import RunTabs from './run-tabs';
// needs to store state later --> what tab we're on so class

export default class RunMainCard extends React.Component {
  render() {
    return (
      <div className="w-full h-screen fixed flex justify-center items-center top-0 left-0 bg-gray-800 bg-opacity-30">
        <div className="relative bg-white rounded-xl p-6 max-w-2xl ml-6 mr-6">
          <button className="absolute -top-4 -right-3 bg-red-400 p-2 rounded-3xl text-white">x</button>
          {/* hero-img */}
          <div className="mb-6">
            <img className="w-full h-56 xxs:h-64 xs:h-80 object-cover rounded-xl" src="/images/placeholder-img-sq.jpg" alt="" />
          </div>
          {/* content */}
          <div className="pl-1">
            {/* content-header */}
            <div className="mb-4">
              <h1 className="font-lora text-xl font-bold">Morning Sun Run</h1>
              <p className="flex gap-1 font-lora">
                <span>October 2nd, 2022</span>  |
                <span>4.2 miles</span>  |
                <span>7:58 / mi</span>
              </p>
            </div>
            {/* content-main */}
            <div className="font-roboto max-w-lg mb-4">
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus vel incidunt animi reprehenderit quaerat aspernatur!</p>
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
