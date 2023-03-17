import React, { useContext } from 'react';
import { AppContext } from '../../lib';
import HomeNavbar from './home-nav';
import SignInNavbar from './signin-nav';

export default function Navbar(props) {

  const { user } = useContext(AppContext);
  const { myRunsNavIsOpen, setMyRunsNavIsOpen } = props;

  const navBar = user === null
    ? <SignInNavbar />
    : <HomeNavbar myRunsNavIsOpen={myRunsNavIsOpen} setMyRunsNavIsOpen={setMyRunsNavIsOpen} />;
  return (
    navBar
  );
}
