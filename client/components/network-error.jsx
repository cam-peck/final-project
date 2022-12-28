import React from 'react';

export default function NetworkError(props) {
  const errorMessage = props.id !== undefined
    ? `Id: ${props.id} not found. Enter a valid Id and refresh the page.`
    : 'Please check your internet connection and refresh the page.';
  return (
    <div className="max-w-6xl flex flex-col gap-2 justify-center items-center mt-8">
      <h1 className="font-roboto text-2xl">A network error has occured.</h1>
      <h2 className="font-roboto text-lg">{errorMessage}</h2>
    </div>
  );
}
