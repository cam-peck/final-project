import React from 'react';

export default function EditDeleteMenu(props) {
  const { handleClick, id } = props;
  return (
    <div onClick={event => handleClick(event, id)} className="flex flex-col absolute right-4 top-1 text-sm bg-gray-100 text-black rounded-sm shadow-md select-none">
      <p id="edit" className="hover:bg-blue-300 hover:cursor-pointer w-32 py-4 text-center">Edit</p>
      <p id="delete" className="hover:bg-blue-300 hover:cursor-pointer w-32 py-4 text-center">Delete</p>
    </div>
  );
}
