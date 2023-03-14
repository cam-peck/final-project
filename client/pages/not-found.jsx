import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(props) {
  return (
    <div className="flex justify-center items-center flex-col gap-6 mt-6 text-center">
      <h1 className="font-roboto text-2xl">Oops... We couldn&apos;t find the page you were looking for!</h1>
      <p>
        <Link className="p-3 bg-blue-500 text-white rounded-xl text-lg" to='/home/activities'>Return to home page</Link>
      </p>
    </div>
  );
}
