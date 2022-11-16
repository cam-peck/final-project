import React from 'react';

export default function DeleteSnackbar(props) {
  const { toggle, handleDelete, entryId } = props;
  return (
    <section className="w-full flex justify-center pl-6 pr-6 absolute transition-all duration-300 bottom-8">
      <div className="w-full max-w-2xl flex items-center justify-between bg-gray-900 opacity-90 rounded-lg py-4 px-5 z-10">
        <div>
          <h1 className="text-white">Are you sure you&apos;d like to remove this run?</h1>
        </div>
        <div className="flex flex-nowrap items-center">
          <button onClick={() => handleDelete(entryId)} className="bg-red-600 text-white rounded-2xl px-4 py-3 mr-6">Delete</button>
          <i onClick={toggle} className="fa-solid fa-x text-white text-xl hover:cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
