import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavItems(props) {
  const { drawerIsOpen, myRunsNavIsOpen, setMyRunsNavIsOpen } = props;
  const navigate = useNavigate();

  const handleClick = event => {
    if (myRunsNavIsOpen === false) {
      if (event.target.tagName === 'BUTTON' || event.target.tagName === 'I') {
        if (drawerIsOpen) {
          navigate('/home/activities'); // on mobile nav to activities page
        } else {
          setMyRunsNavIsOpen(true); // on desktop open the dropdown menu
        }
      }
    } else setMyRunsNavIsOpen(false);
  };

  const showMyRuns = myRunsNavIsOpen === true
    ? 'md:flex'
    : 'hidden';
  const myRunsButton = drawerIsOpen === true
    ? 'w-full p-4 pl-3.5'
    : 'p-4 m-2 mr-4';
  const myWorkoutsNav = drawerIsOpen === true
    ? 'w-full p-4 pl-3'
    : 'p-4 m-2 mr-6';
  return (
    <div className="flex transition-all ease-in-out duration-200 relative z-10 flex-col md:flex-row">
      <button onClick={handleClick} className={`flex items-center text-lg ${myRunsButton} transition-all ease-in-out duration-200 hover:bg-gray-400 hover:bg-opacity-20`}>
        <i className="fa-solid fa-person-running text-2xl pr-3" />
        My Runs
      </button>
      <div onClick={handleClick} className={`absolute top-16 left-2 ${showMyRuns} z-10 flex-col bg-gray-100 text-black rounded-sm shadow-md`}>
        <Link className="hover:bg-blue-300 w-40 py-4 text-center" to="/home/progress">Progress</Link>
        <Link className="hover:bg-blue-300 w-40 py-4 text-center" to="/home/activities">Activities</Link>
        <Link className="hover:bg-blue-300 w-40 py-4 text-center" to="/home/profile">Profile</Link>
      </div>
      <Link to='/workouts' className={`flex items-center text-lg transition-all ease-in-out duration-200 hover:bg-gray-400 hover:bg-opacity-20 ${myWorkoutsNav}`}>
        <i className="fa-solid fa-dumbbell text-lg pr-3" />
        My Workouts
      </Link>
    </div>
  );
}
