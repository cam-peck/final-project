import React from 'react';
import Map from '../gmaps/map';
import NoGpxFound from '../gmaps/no-gpx-found';

export default function UploadRunCard(props) {
  const { fileInputRef, setHasGpx, handleGpxData, gpxPath, hasGpx } = props;
  return (
    <section className="flex flex-col mb-4 pt-1">
      <div className="">
        {
          hasGpx === true
            ? <Map gpxPath={gpxPath} />
            : <NoGpxFound borderRounded="rounded-tr-xl rounded-tl-xl" textSize="text-xl" height="h-72 md:h-80" width="w-full"/>
        }
      </div>
      <div className="bg-blue-200 flex justify-between items-center rounded-br-xl rounded-bl-xl px-5 py-3">
        <p className="font-lora text-lg">Have GPS data?</p>
        <label htmlFor="file-input" className="text-center bg-blue-600 text-white px-7 py-3 rounded-3xl hover:cursor-pointer active:transform active:translate-y-[1px] select-none">Upload data</label>
        <input id="file-input" type="file" name="file" accept=".gpx" onChange={event => { setHasGpx(true); handleGpxData(event); }} className="hidden" ref={fileInputRef}/>
      </div>
    </section>
  );
}
