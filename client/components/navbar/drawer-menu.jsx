import React, { useContext } from 'react';
import NavItems from './nav-items';
import { AppContext } from '../../lib';

export default function DrawerMenu(props) {
  const { handleSignOut } = useContext(AppContext);

  const isOpen = props.isOpen
    ? 'left-0'
    : '-left-60';
  return (
    <div className={`absolute top-0 ${isOpen} bottom-0 w-60 surface-bg-color opacity shadow-xl flex flex-col justify-between rounded-br-xl transition-left ease-in-out duration-200 md:hidden z-10`}>
      <section>
        <div className="flex justify-center items-center pt-8 pb-8 bg-blue-600">
          <h1 className="logo-text text-2xl text-white">RunningFuze</h1>
        </div>
        <div onClick={() => { props.setOpen(false); }} className="flex flex-col pb-4 border-b-2 border-gray-500 m-2">
          <NavItems drawerIsOpen={true}/>
          <button onClick={() => { props.setOpen(false); handleSignOut(); }} className="w-full p-5 flex items-center text-lg transition-all ease-in-out duration-200 hover:bg-gray-400 hover:bg-opacity-20">
            <i className="fa-solid fa-right-from-bracket text-xl pr-[13px]" />
            <p className="text-lg">Sign out</p>
          </button>
        </div>
      </section>
    </div>
  );
}
