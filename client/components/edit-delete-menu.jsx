import React from 'react';

export default function EditDeleteMenu(props) {
  const { handleClick, id } = props;
  return (
    <div onClick={event => handleClick(event, id)} className="flex flex-col absolute right-4 top-1 text-sm bg-gray-100 text-black rounded-sm shadow-md select-none">
      <a id="edit" className="hover:bg-blue-300 w-32 py-4 text-center" href="">Edit</a>
      <a id="delete" className="hover:bg-blue-300 w-32 py-4 text-center" href="">Delete</a>
    </div>
  );
}
