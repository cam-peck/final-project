import React, { useContext, useState } from 'react';
import DrawerMenu from './drawer-menu';
import { AppContext } from '../lib';
import { Turn as Hamburger } from 'hamburger-react';

export default function HomeNavbar(props) {
  const { handleSignOut } = useContext(AppContext);
  const [isOpen, setOpen] = useState(false);

  const drawerMenu = isOpen
    ? <DrawerMenu setOpen={setOpen} />
    : '';

  const darkBackground = isOpen
    ? <div className="bg-gray-900 opacity-40 absolute top-0 left-0 bottom-0 right-0 z-0" onClick={() => { setOpen(false); }} />
    : '';

  return (
    (
      <header className="w-full p-6 bg-blue-600">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className='flex gap-3'>
            <i className="fa-solid fa-person-running text-white text-3xl" />
            <h1 className="logo-text text-white text-2xl">RunningFuze</h1>
          </div>
          {/* Menu Items */}
          <div className="space-x-6 text-white items-center hidden md:block">
            <a href="#" className="hover:text-darkGrayishBlue">My Runs</a>
            <a href="#" className="hover:text-darkGrayishBlue">My Workouts</a>
            {/* Button */}
            <button onClick={handleSignOut} className="text-white bg-red-500 p-3 rounded-xl">Sign out</button>
          </div>
          <div className="md:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} color="white" />
          </div>
          {drawerMenu}
          {darkBackground}
        </nav>
      </header>
    )
  );
}
