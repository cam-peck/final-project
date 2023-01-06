import React from 'react';
import RunFormMap from '../gmaps/run-form-map';

export default function UploadRunCard(props) {
  const { fileInputRef, toggleGpxTrue, handleGpxData, gpxPath } = props;
  return (
    <section className="flex flex-col mb-4 pt-1">
      <div className="">
        <RunFormMap gpxPath={gpxPath}/>
      </div>
      <div className="bg-blue-200 flex justify-between items-center rounded-br-xl rounded-bl-xl px-5 py-3">
        <p className="font-lora text-lg">Have GPS data?</p>
        <input type="file" name="file" accept=".gpx" onChange={event => { toggleGpxTrue(); handleGpxData(event); }} className="bg-blue-600 text-white px-7 py-3 rounded-3xl" ref={fileInputRef}/>
      </div>
    </section>
  );
}
