import React from 'react';

export default function UploadRunCard(props) {
  return (
    <section className="flex flex-col pl-4 pr-4 mb-4">
      <div className="">
        <img className="object-cover w-full h-72 rounded-tr-xl rounded-tl-xl" src="/images/placeholder-img-sq.jpg" alt="" />
      </div>
      <div className="bg-blue-200 flex justify-between items-center rounded-br-xl rounded-bl-xl px-5 py-3">
        <p className="font-lora text-lg">Have GPS data?</p>
        <button className="bg-blue-600 text-white px-7 py-3 rounded-3xl">Upload here!</button>
      </div>
    </section>
  );
}
