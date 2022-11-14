import React from 'react';

export default function NavItems(props) {
  return (
    <>
      <div className="flex items-center hover:cursor-pointer p-4 m-2 transition-all ease-in-out duration-200 hover:bg-gray-400 hover:bg-opacity-20">
        <i className="fa-solid fa-person-running text-2xl pr-3" />
        <a className="text-lg" href="#">My Runs</a>
      </div>
      <div className="flex items-center hover:cursor-pointer p-4 m-2 transition-all ease-in-out duration-200 hover:bg-gray-400 hover:bg-opacity-20">
        <i className="fa-solid fa-dumbbell text-lg pr-3" />
        <a href="#sign-in" className="text-lg">My Workouts</a>
      </div>
    </>
  );

}
