import React from 'react';
import { calculatePace, formatDate } from '../../lib';
import DeleteSnackbar from '../delete-snackbar';

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
    const formattedDate = formatDate(date);

    const { toggleMenuIsOpen, snackbarIsOpen } = this.state;
    const { handleClick, handleDelete, toggleMenu, toggleSnack } = this;
    return (
      <div onClick={event => { if (event.target.id === 'background') { closeModal(); } }} id="background" className="w-full h-screen fixed flex justify-center items-center top-0 left-0 bg-gray-800 bg-opacity-30">
        <div className="relative bg-white rounded-xl p-6 max-w-2xl ml-6 mr-6">
          <button onClick={closeModal} className="absolute -top-4 -right-5 w-10 h-10 rounded-full bg-red-600 text-white"><i className="fa-regular fa-xl fa-circle-xmark" /></button>
          {/* hero-img */}
          <div className="mb-6">
            <img className="w-full h-56 xxs:h-64 xs:h-80 object-cover rounded-xl" src="/images/placeholder-map.png" alt="" />
          </div>
          {/* content */}
          <div className="pl-1">
            {/* content-header */}
            <div className="mb-4">
              <div className="flex justify-between items-center relative">
                <h1 className="font-lora text-xl font-bold">{title}</h1>
                <i onClick={toggleMenu} className="fa-solid fa-lg fa-ellipsis-vertical hover:cursor-pointer" />
                {toggleMenuIsOpen === true
                  ? <div onClick={(event, entryID) => handleClick(event, entryId)} className="flex flex-col absolute right-4 top-1 text-sm bg-gray-100 text-black rounded-sm shadow-md">
                    <a id="edit" className="hover:bg-blue-300 w-32 py-4 text-center" href="#edit-run?">Edit</a>
                    <a id="delete" className="hover:bg-blue-300 w-32 py-4 text-center" href="">Delete</a>
                  </div>
                  : '' }
              </div>
              <p className="flex-col x2s:flex-row flex gap-2 font-lora text-lg">
                <span>{formattedDate}</span>  <span className="hidden x2s:block">|</span>
                <span>{distance} {distanceUnits}</span>   <span className="hidden x2s:block">|</span>
                <span>{pace}</span>
              </p>
            </div>
            {/* content-main */}
            <div className="font-roboto max-w-lg mb-4">
              <p>{description}</p>
            </div>
          </div>
          {/* tab-menu
          <div className="modal-footer">
            <RunTabs>
              <div label="Notes">
                <p>Notes</p>
              </div>
              <div label="Pace">
                <p>Pace</p>
              </div>
              <div label="Elevation">
                <p>Elevation</p>
              </div>
            </RunTabs>
          </div> */}
        </div>
        {snackbarIsOpen === true
          ? <DeleteSnackbar isOpen={snackbarIsOpen} toggle={toggleSnack} entryId={entryId} handleDelete={handleDelete}/>
          : '' }
      </div>
    );
  }
}
