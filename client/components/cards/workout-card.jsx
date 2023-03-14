import React, { useState } from 'react';
import { format } from 'date-fns';
import { removeTz } from '../../lib';
import EditDeleteMenu from '../edit-delete-menu';
import DeleteSnackbar from '../delete-snackbar';
import { useNavigate } from 'react-router-dom';

export default function WorkoutCard(props) {
  const { editDeleteEnabled, deleteWorkout } = props;
  const navigate = useNavigate();

  const [toggleMenuIsOpen, setToggleMenuIsOpen] = useState(false);
  const [snackbarIsOpen, setSnackBarIsOpen] = useState(false);

  const toggleMenu = () => {
    setToggleMenuIsOpen(!toggleMenuIsOpen);
  };

  const toggleSnack = () => {
    setSnackBarIsOpen(!snackbarIsOpen);
  };

  const handleClick = (event, entryId) => {
    event.preventDefault();
    if (event.target.id === 'edit') {
      navigate(`/workouts/${workoutId}`);
    }
    if (event.target.id === 'delete') {
      setSnackBarIsOpen(true);
      toggleMenu();
    }
  };

  const handleDelete = entryId => {
    deleteWorkout(entryId);
  };

  const { date, description, warmupDistance, warmupNotes, workoutDistance, warmupDistanceUnits, workoutDistanceUnits, cooldownDistanceUnits, workoutNotes, cooldownDistance, cooldownNotes, workoutId } = props.data;
  const formattedDate = format(removeTz(date), 'EEEE, LLL do');
  return (
    <section className="font-caveat bg-blue-200 pt-3 pb-3 pl-4 pr-4 rounded-lg border border-gray-400 x2s:text-lg shadow-lg relative">
      <div className="mb-1.5 flex flex-col gap-[2px]">
        <div className="flex justify-between relative">
          <h1 className="text-lg x2s:text-2xl">{formattedDate}</h1>
          <i onClick={toggleMenu} className={`fa-solid fa-lg fa-ellipsis-vertical ${editDeleteEnabled ? '' : 'hidden'} hover:cursor-pointer block pl-2 pt-3 pb-3`} />
          {
            toggleMenuIsOpen === true
              ? <EditDeleteMenu id={workoutId} handleClick={handleClick}/>
              : ''
          }
        </div>
        <p>{description}</p>
      </div>
      <hr className="border border-gray-600 mb-3" />
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-temperature-high text-red-400 text-lg" />
          {
            warmupDistance !== 0
              ? <p>{warmupDistance} {warmupDistance !== 1 ? warmupDistanceUnits : warmupDistanceUnits.slice(0, -1)}  |  {warmupNotes}</p>
              : <p>----- N / A ------</p>
            }

        </div>
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-bolt text-red-700 text-lg" />
          {
            workoutDistance !== 0
              ? <p>{workoutDistance} {workoutDistance !== 1 ? workoutDistanceUnits : workoutDistanceUnits.slice(0, -1)}  |  {workoutNotes}</p>
              : <p>----- N / A ------</p>
            }
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-temperature-low text-blue-400 text-lg" />
          {
            cooldownDistance !== 0
              ? <p>{cooldownDistance} {cooldownDistance !== 1 ? cooldownDistanceUnits : cooldownDistanceUnits.slice(0, -1)}  |  {cooldownNotes}</p>
              : <p>----- N / A ------</p>
            }
        </div>
      </div>
      {
        snackbarIsOpen === true
          ? <DeleteSnackbar isOpen={snackbarIsOpen} toggle={toggleSnack} id={workoutId} handleDelete={handleDelete} left='left-0' top='top-0' right='right-0' bottom='bottom-0' alignItems='items-center'/>
          : ''
        }
    </section>
  );
}
