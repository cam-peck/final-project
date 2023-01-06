import React from 'react';
import Map from '../gmaps/map';

export default function UploadRunCard(props) {
  const { fileInputRef, toggleGpxTrue, handleGpxData, gpxPath, hasGpx } = props;
  return (
    <section className="flex flex-col mb-4 pt-1">
      <div className="">
        {
          hasGpx === true
            ? <Map gpxPath={gpxPath} />
            : <div className="relative">
              <img className="object-cover w-full h-72 md:h-80 rounded-tr-xl rounded-tl-xl" src='/images/placeholder-map.png' alt='placeholder-map' />
              <div className="bg-black absolute h-72 md:h-80 w-full top-0 opacity-60 rounded-tr-xl rounded-tl-xl flex justify-center items-center">
                <h1 className='text-white text-xl'>No GPS data found...</h1>
              </div>
            </div>
        }
      </div>
      <div className="bg-blue-200 flex justify-between items-center rounded-br-xl rounded-bl-xl px-5 py-3">
        <p className="font-lora text-lg">Have GPS data?</p>
        <label htmlFor="file-input" className="bg-blue-600 text-white px-7 py-3 rounded-3xl hover:cursor-pointer active:transform active:translate-y-[1px]">Upload data</label>
        <input id="file-input" type="file" name="file" accept=".gpx" onChange={event => { toggleGpxTrue(); handleGpxData(event); }} className="hidden" ref={fileInputRef}/>
      </div>
    </section>
  );
}
