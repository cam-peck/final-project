import React from 'react';
import { Link } from 'react-router-dom';

export default function TimeoutError(props) {
  const { handleSubmit, retryTimeout } = props;
  return (
    <div className="max-w-6xl flex flex-col gap-2 justify-center items-center mt-8">
      <h1 className="font-roboto text-2xl">Request timed out.</h1>
      <h2 className="font-roboto text-lg text-center mb-2">Something happened on our end, and your request didn&apos;t go through.</h2>
      <div className="w-full flex gap-4 justify-center items-center">
        <button type="button" className="bg-blue-500 transition ease-in-out duration-300 hover:bg-blue-600 text-white p-3 px-8 rounded-lg font-bold text-lg" onClick={event => { retryTimeout(); handleSubmit(event); }}>Try again?</button>
        <Link type="button" className="bg-blue-500 transition ease-in-out duration-300 hover:bg-blue-600 text-white p-3 px-8 rounded-lg font-bold text-lg" href='#home?tab=activities' >Return Home</Link>
      </div>
    </div>
  );
}
