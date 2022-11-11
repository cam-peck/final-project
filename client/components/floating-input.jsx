import React from 'react';

export default function FloatingInput(props) {
  return (
    <div className="relative z-0 mb-4 group pl-4 pr-4">
      <input autoComplete="on" type={props.type} name={props.name} id={props.name} value={props.value} onChange={props.onChange} className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor={props.name} className="peer-focus:font-medium peer-focus:ml-4 absolute text-md text-gray-500 dark:text-gray-400 duration-200 transform -translate-y-6 scale-75 top-3 z-10 cursor-text origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{props.placeholder}</label>
    </div>
  );
}
