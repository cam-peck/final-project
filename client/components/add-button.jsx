import React from 'react';
import { Link } from 'react-router-dom';

export default function AddButton(props) {
  const { link } = props;
  return (
    <div className="flex justify-end">
      <div className="flex justify-center items-center bg-blue-100 rounded-2xl shadow-2xl border-2 border-blue-400 fixed bottom-8">
        <Link className="text-4xl xs:text-5xl flex justify-center items-center font-bold text-blue-800 w-[56px] h-[56px] xs:w-[70px] xs:h-[70px]" to={link}><i className="fa-solid fa-plus text-2xl xs:text-3xl" /></Link>
      </div>
    </div>
  );
}
