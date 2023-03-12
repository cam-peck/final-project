import React from 'react';

export default function LoadingSpinner(props) {
  const background = props.darkbg === true
    ? 'bg-black bg-opacity-40'
    : '';
  return (
    <section data-testid='loading-spinner' className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center ${background} items-center z-20`}>
      <div className="lds-ellipsis" ><div /><div /><div /><div /></div>
    </section>
  );
}
