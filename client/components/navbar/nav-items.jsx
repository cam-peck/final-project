import React from 'react';

export default class NavItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myRunsNav: false,
      myWorkoutsNav: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.tagName === 'BUTTON' && this.state.myRunsNav === false) {
      if (this.props.drawerIsOpen) {
        window.location.hash = '#home?tab=activities';
      } else {
        this.setState({ myRunsNav: true });
      }
    } else {
      this.setState({ myRunsNav: false });
    }
  }

  render() {
    const { myRunsNav } = this.state;
    const { drawerIsOpen } = this.props;
    const { handleClick } = this;
    const showMyRuns = myRunsNav === true
      ? 'md:flex'
      : '';
    const myRunsButton = drawerIsOpen === true
      ? 'w-full p-5'
      : 'p-4 m-2 mr-6';
    return (
      <div className="flex transition-all ease-in-out duration-200 relative z-0">
        <button onClick={handleClick} className={`flex items-center text-lg ${myRunsButton} transition-all ease-in-out duration-200 hover:bg-gray-400 hover:bg-opacity-20`}>
          <i className="fa-solid fa-person-running text-2xl pr-3" />
          My Runs
        </button>
        <div onClick={handleClick} className={`hidden absolute top-16 left-2 ${showMyRuns} z-10 flex-col bg-gray-100 text-black rounded-sm shadow-md`}>
          <a className="hover:bg-blue-300 w-40 py-4 text-center" href="#home?tab=progress">Progress</a>
          <a className="hover:bg-blue-300 w-40 py-4 text-center" href="#home?tab=activities">Activities</a>
          <a className="hover:bg-blue-300 w-40 py-4 text-center" href="#home?tab=profile">Profile</a>
        </div>
      </div>
    );
  }
}
