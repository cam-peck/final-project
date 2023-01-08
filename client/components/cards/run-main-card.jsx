import React from 'react';
import { calculatePace, removeTz } from '../../lib';
import DeleteSnackbar from '../delete-snackbar';
import EditDeleteMenu from '../edit-delete-menu';
import NoGpxFound from '../gmaps/no-gpx-found';
import { format } from 'date-fns';

export default class RunMainCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenuIsOpen: false,
      snackbarIsOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSnack = this.toggleSnack.bind(this);
  }

  toggleMenu() {
    this.setState({ toggleMenuIsOpen: !this.state.toggleMenuIsOpen });
  }

  toggleSnack() {
    this.setState({ snackbarIsOpen: !this.state.snackbarIsOpen });
  }

  handleClick(event, entryId) {
    event.preventDefault();
    if (event.target.id === 'edit') {
      window.location.hash = `#run-form?mode=edit&entryId=${entryId}`;
    }
    if (event.target.id === 'delete') {
      this.setState({ snackbarIsOpen: true });
      this.toggleMenu();
    }
  }

  handleDelete(entryId) {
    this.props.deleteRun(entryId);
  }

  render() {
    const { title, date, description, distance, distanceUnits, duration, closeModal, entryId } = this.props;
    const splitDuration = duration.split(':');
    const pace = calculatePace(distance, distanceUnits, splitDuration[0], splitDuration[1], splitDuration[2]);
    const dtDateOnly = removeTz(date);
    const formattedDate = format(new Date(dtDateOnly), 'MMMM d, yyyy');

    const { toggleMenuIsOpen, snackbarIsOpen } = this.state;
    const { handleClick, handleDelete, toggleMenu, toggleSnack } = this;
    return (
      <div onClick={event => { if (event.target.id === 'background') { closeModal(); } }} id="background" className="w-full overflow-y-scroll h-screen fixed flex justify-center items-center top-0 left-0 bg-gray-800 bg-opacity-30 z-10">
        <div className="absolute top-20 x2s:relative x2s:-top-12 bg-white rounded-xl p-6 max-w-2xl ml-6 mr-6">
          <button onClick={closeModal} className="absolute -top-4 -right-5 w-10 h-10 rounded-full bg-red-600 text-white"><i className="fa-regular fa-xl fa-circle-xmark" /></button>
          {/* hero-img */}
          <NoGpxFound borderRounded="rounded-xl" height="h-56 xxs:h-64 xs:h-80" width="w-full "/>
          {/* content */}
          <div className="pl-1 mt-4">
            {/* content-header */}
            <div className="mb-4">
              <div className="flex justify-between items-center relative mb-1">
                <h1 className="font-lora text-lg md:text-xl font-bold">{title}</h1>
                <i onClick={toggleMenu} className="fa-solid fa-lg fa-ellipsis-vertical hover:cursor-pointer block pl-2 pt-3 pb-3" />
                {toggleMenuIsOpen === true
                  ? <EditDeleteMenu id={entryId} handleClick={handleClick} />
                  : '' }
              </div>
              <div className="flex flex-col x2s:flex-row font-lora text-md md:text-lg">
                <div className="mb-1 flex">
                  <p>{formattedDate}</p>
                  <span className="hidden x2s:block pr-2 pl-2">|</span>
                </div>
                <div className="flex gap-2">
                  <p className=''>{distance} {distanceUnits}</p>
                  <span className="block">|</span>
                  <p>{pace}</p>
                </div>
              </div>
            </div>
            {/* content-main */}
            <div className="font-roboto text-md max-w-lg mb-4">
              <p>{description}</p>
            </div>
          </div>
        </div>
        {snackbarIsOpen === true
          ? <DeleteSnackbar isOpen={snackbarIsOpen} toggle={toggleSnack} id={entryId} handleDelete={handleDelete} bottom='bottom-8'/>
          : '' }
      </div>
    );
  }
}
