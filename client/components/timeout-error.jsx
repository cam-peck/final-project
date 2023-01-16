import React from 'react';

export default function TimeoutError(props) {
  const { handleSubmit } = props;
  return (
    <div className="max-w-6xl flex flex-col gap-2 justify-center items-center mt-8">
      <h1 className="font-roboto text-2xl">Request timed out.</h1>
      <h2 className="font-roboto text-lg">Something happened on our end, and your request didn&apos;t go through.</h2>
      <button type="button" onClick={handleSubmit}>Try again?</button>
    </div>
  );
}
