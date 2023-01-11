import React from 'react';

export default function NoGpxFound(props) {
  const { borderRounded, height, width, textSize } = props;
  return (
    <div className="relative">
      <img className={`object-cover ${width} ${height} ${borderRounded}`} src='/images/gps-map-placeholder.png' alt='placeholder-map' />
      <div className={`bg-black absolute top-0 opacity-70 ${width} ${height} ${borderRounded} flex justify-center items-center`}>
        <h1 className={`text-white ${textSize} p-4 text-center`}>No GPS data found...</h1>
      </div>
    </div>
  );
}
