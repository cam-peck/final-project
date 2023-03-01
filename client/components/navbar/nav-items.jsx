import React, { useState } from 'react';

export default function NavItems(props) {
  const { drawerIsOpen } = props;

  const [myRunsNavIsOpen, setMyRunsNavIsOpen] = useState(false);

  const handleClick = event => {
    if (event.target.tagName === 'BUTTON' && myRunsNavIsOpen === false) {
      if (drawerIsOpen) {
        window.location.hash = '#home?tab=activities';
      } else {
        setMyRunsNavIsOpen(true);
      }
    } else {
      setMyRunsNavIsOpen(false);
    }
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
        <a className="hover:bg-blue-300 w-40 py-4 text-center" href="#home?tab=progress">Progress</a>
        <a className="hover:bg-blue-300 w-40 py-4 text-center" href="#home?tab=activities">Activities</a>
        <a className="hover:bg-blue-300 w-40 py-4 text-center" href="#home?tab=profile">Profile</a>
      </div>
      <a href='#workouts' className={`flex items-center text-lg transition-all ease-in-out duration-200 hover:bg-gray-400 hover:bg-opacity-20 ${myWorkoutsNav}`}>
        <i className="fa-solid fa-dumbbell text-lg pr-3" />
        My Workouts
      </a>
    </div>
  );
}
