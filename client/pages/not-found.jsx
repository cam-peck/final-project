import React from 'react';

export default function NotFound(props) {
  return (
    <div className="flex justify-center items-center flex-col gap-6 mt-6 text-center">
      <h1 className="font-roboto text-2xl">Oops... We couldn&apos;t find the page you were looking for!</h1>
      <p>
        <a className="p-3 bg-blue-500 text-white rounded-xl text-lg" href='#home?tab=progress'>Return to home page</a>
      </p>
    </div>
  );
}
