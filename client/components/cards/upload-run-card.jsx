import React from 'react';

export default function UploadRunCard(props) {
  return (
    <section className="flex flex-col mb-4 pt-1">
      <div className="">
        <img className="object-cover w-full h-72 md:h-80 rounded-tr-xl rounded-tl-xl" src="/images/placeholder-img-sq.jpg" alt="" />
      </div>
      <div className="bg-blue-200 flex justify-between items-center rounded-br-xl rounded-bl-xl px-5 py-3">
        <p className="font-lora text-lg">Have GPS data?</p>
        <button type="button" className="bg-blue-600 text-white px-7 py-3 rounded-3xl">Upload here!</button>
      </div>
    </section>
  );
}
