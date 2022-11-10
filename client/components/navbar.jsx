import React from 'react';
import { AppContext } from '../lib';

export default class Navbar extends React.Component {

  render() {
    const { handleSignOut, user } = this.context;
    const signInNavbar = (
      <nav className="container-lg mx-auto py-5 bg-blue-600">
        <div className="flex items-center justify-center">
          {/* Logo */}
          <div>
            <h1 className="logo-text text-white text-2xl">RunningFuze</h1>
          </div>
        </div>
      </nav>
    );
    const homeNavbar = (
      <nav className="container-lg mx-auto p-6 bg-blue-600">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <h1 className="logo-text text-white text-2xl">RunningFuze</h1>
          </div>
          {/* Menu Items */}
          <div className="space-x-6 md:flex text-white">
            <a href="#" className="hover:text-darkGrayishBlue">My Runs</a>
            <a href="#" className="hover:text-darkGrayishBlue">My Workouts</a>
          </div>
          {/* Button */}
          <a
            onClick={handleSignOut}
            className="hidden p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
          >Sign out
          </a>
        </div>
      </nav>
    );
    const navBar = user === null
      ? signInNavbar
      : homeNavbar;
    return (
      navBar
    );
  }
}
Navbar.contextType = AppContext;
