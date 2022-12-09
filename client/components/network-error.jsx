import React from 'react';

export default function NetworkError(props) {
  return (
    <div className="max-w-6xl flex flex-col gap-2 justify-center items-center mt-8">
      <h1 className="font-roboto text-2xl">A network error has occured.</h1>
      <h2 className="font-roboto text-lg">Please check your internet connection and refresh the page.</h2>
    </div>
  );
}
