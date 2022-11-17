import React, { useContext } from 'react';
import NavItems from './nav-items';
import { AppContext } from '../../lib';

export default function DrawerMenu(props) {
  const { handleSignOut } = useContext(AppContext);

  const isOpen = props.isOpen
    ? 'left-0'
    : '-left-56';
  return (
    <div className={`absolute top-0 ${isOpen} bottom-0 w-56 surface-bg-color opacity shadow-xl flex flex-col justify-between rounded-br-xl transition-left ease-in-out duration-200 md:hidden z-10`}>
      {/* Title & Nav-items */}
      <section>
        <div className="flex justify-center items-center mt-8 mb-8">
          <h1 className="logo-text text-2xl on-container-color">RunningFuze</h1>
        </div>
        <div onClick={() => { props.setOpen(false); }} className="flex flex-col pb-8 border-b-2 border-gray-500 m-2">
          <NavItems />
        </div>
      </section>
      {/* Sign-out Button */}
      <section className='flex justify-end'>
        <button onClick={() => { props.setOpen(false); handleSignOut(); }} className="w-full text-white bg-red-500 p-8 rounded-br-xl flex items-center justify-center gap-2">
          <p>Sign out</p>
          <i className="fa-solid fa-right-from-bracket" />
        </button>
      </section>
    </div>
  );
}
