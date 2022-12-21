import React from 'react';

export default function AddButton(props) {
  const link = props.href;
  return (
    <div className="flex justify-end">
      <div className="flex justify-center items-center bg-blue-100 rounded-2xl shadow-2xl border-2 border-blue-400 fixed bottom-8">
        <a className="text-4xl xs:text-5xl flex justify-center items-center font-bold text-blue-800 w-[56px] h-[56px] xs:w-[70px] xs:h-[70px]" href={link}><i className="fa-solid fa-plus text-2xl xs:text-3xl" /></a>
      </div>
    </div>
  );
}
