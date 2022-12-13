import React, { useContext, useState } from 'react';
import DrawerMenu from './drawer-menu';
import NavItems from './nav-items';
import { AppContext } from '../../lib';
import { Turn as Hamburger } from 'hamburger-react';

export default function HomeNavbar(props) {
  const { handleSignOut } = useContext(AppContext);
  const [isOpen, setOpen] = useState(false);

  const darkBackground = isOpen
    ? <div className="bg-gray-900 opacity-40 absolute top-0 left-0 bottom-0 right-0 z-10 transition-all ease-in-out duration-300" onClick={() => { setOpen(false); }} />
    : <div className="bg-gray-900 opacity-0 absolute z-10" />;

  return (
    (
      <header className="w-full bg-blue-600">
        <nav className="max-w-6xl px-6 mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className='flex gap-3 pt-2 pb-2 items-center'>
            <img className="w-[35px] h-[35px]" src="/images/rfz-icon.png" />
            <h1 className="logo-text text-white text-xl x2s:text-2xl">RunningFuze</h1>
          </div>
          {/* Menu Items */}
          <div className="text-white items-center hidden md:flex">
            <NavItems />
            {/* Sign-out Button */}
            <button onClick={handleSignOut} className="text-white bg-red-500 p-3 rounded-xl flex items-center">
              <i className="fa-solid fa-right-from-bracket text-xl pr-2.5" />
              Sign out
            </button>
          </div>
          {/* Hamburger Menu */}
          <div className="md:hidden pt-2 pb-2">
            <Hamburger size={28} toggled={isOpen} toggle={setOpen} color="white" />
          </div>
          <DrawerMenu setOpen={setOpen} isOpen={isOpen}/>
          {darkBackground}
        </nav>
      </header>
    )
  );
}
