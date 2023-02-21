import React from 'react';

export default function RestDayModal(props) {
  const { closeModal } = props;
  return (
    <div onClick={event => { if (event.target.id === 'background') { closeModal(); } }} id="background" className="w-full overflow-y-scroll h-screen fixed flex justify-center items-center top-0 left-0 bg-gray-800 bg-opacity-30 z-10">
      <div className="absolute tall:relative bg-white rounded-xl p-6 max-w-xl min-w-[260px] w-[85%] top-10 tall:top-0 ml-6 mr-6">
        <button onClick={closeModal} className="absolute -top-4 -right-5 w-10 h-10 rounded-full bg-red-600 text-white"><i className="fa-regular fa-xl fa-circle-xmark" /></button>
        {/* content */}
        <div className="pl-1 mt-4">
          {/* content-header */}
          <div className="mb-4">
            <div className="flex justify-between items-center relative mb-1">
              <h1 className="font-lora text-lg md:text-xl font-bold">Title Here!</h1>
            </div>
          </div>
          {/* content-main */}
          <div className="font-roboto text-md max-w-lg mb-4">
            <p>Main Content here!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
