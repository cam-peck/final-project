import React, { useContext } from 'react';
import { AppContext } from '../lib';

export default function DrawerMenu(props) {
  const { handleSignOut } = useContext(AppContext);

  return (
    <div className="absolute top-0 left-0 bottom-0 w-48 surface-bg-color opacity shadow-xl flex flex-col justify-between rounded-br-xl transition ease-in md:hidden z-10">
      <section>
        {/* Title & Nav-items */}
        <div className="flex justify-center items-center mt-8 mb-8">
          {/* Title */}
          <h1 className="logo-text text-xl on-container-color">RunningFuze</h1>
        </div>
        {/* Nav-items */}
        <div className="flex flex-col pb-8 border-b-2 border-gray-500">
          {/* Item 1 */}
          <div className="flex items-center hover:bg-gray-300 hover:cursor-pointer pt-4 pb-4 pl-6">
            <i className="fa-solid fa-person-running text-2xl pr-3" />
            <a className="text-lg" onClick={() => { props.setOpen(false); }} href="#">My Runs</a>
          </div>
          {/* Item 2 */}
          <div className="flex items-center hover:bg-gray-300 hover:cursor-pointer pt-4 pb-4 pl-6">
            <i className="fa-solid fa-dumbbell text-lg pr-3" />
            <a href="#sign-in" onClick={() => { props.setOpen(false); }} className="text-lg">My Workouts</a>
          </div>
        </div>
      </section>
      {/* Sign-out Button */}
      <section className='flex justify-end'>
        <button onClick={() => { props.setOpen(false); handleSignOut(); }} className="text-white bg-red-500 p-3 rounded-xl flex items-center gap-2">
          <p>Sign out</p>
          <i className="fa-solid fa-right-from-bracket" />
        </button>
      </section>
    </div>
  );
}
