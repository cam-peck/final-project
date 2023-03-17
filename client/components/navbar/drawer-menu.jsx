import React, { useContext } from 'react';
import NavItems from './nav-items';
import { AppContext } from '../../lib';

export default function DrawerMenu(props) {
  const { handleSignOut } = useContext(AppContext);
  const { navDrawerIsOpen, setNavDrawerIsOpen, myRunsNavIsOpen, setMyRunsNavIsOpen } = props;

  return (
    <div className={`fixed top-0 ${navDrawerIsOpen ? 'left-0' : '-left-52 x2s:-left-60'} bottom-0 w-52 x2s:w-60 surface-bg-color opacity shadow-xl flex flex-col justify-between transition-left ease-in-out duration-200 md:hidden z-20`}>
      <section>
        <div className="flex items-center h-[64px] pl-5 bg-blue-600">
          <img className="w-[30px] h-[30px] mr-4" src="/images/rfz-icon.png" />
          <h1 className="logo-text text-xl x2s:text-2xl text-white">RFZ</h1>
        </div>
        <div onClick={() => { setNavDrawerIsOpen(false); }} className="flex flex-col pb-4 gap-1 border-b-2 border-gray-500 m-2">
          <NavItems drawerIsOpen={true} myRunsNavIsOpen={myRunsNavIsOpen} setMyRunsNavIsOpen={setMyRunsNavIsOpen}/>
          <button onClick={() => { setNavDrawerIsOpen(false); handleSignOut(); }} className="w-full p-4 pl-3.5 flex items-center text-lg transition-all ease-in-out duration-200 hover:bg-gray-400 hover:bg-opacity-20">
            <i className="fa-solid fa-right-from-bracket text-xl pr-[13px]" />
            <p className="text-lg">Sign out</p>
          </button>
        </div>
      </section>
    </div>
  );
}
