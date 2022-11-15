import React from 'react';

export default function RunMiniCard(props) {
  return (
    <div className="w-full bg-blue-800 text-white flex justify-between items-center rounded-xl">
      <div className="flex items-center gap-6">
        <div className="w-14 ml-4">
          <img className="rounded-3xl" src="/images/placeholder-img-sq.jpg" alt="" />
        </div>
        <div className="flex flex-col gap-2 font-roboto">
          <h2 className="font-medium text-lg">October 2nd, 2022</h2>
          <p><span>4.2 miles</span> | <span>7:58 / mi</span></p>
        </div>
      </div>
      <div className="w-28">
        <img className="rounded-tr-lg rounded-br-lg" src="/images/placeholder-img-sq.jpg" alt="" />
      </div>
    </div>
  );
}
