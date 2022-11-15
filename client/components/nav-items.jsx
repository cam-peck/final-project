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
    if (event.target.tagName === 'BUTTON') {
      this.setState({ myRunsNav: true });
    } else {
      this.setState({ myRunsNav: false });
    }
  }

  render() {
    const { myRunsNav } = this.state;
    const { handleClick } = this;
    const showMyRuns = myRunsNav === true
      ? 'md:flex'
      : '';
    return (
      <>
        <div className="flex items-center hover:cursor-pointer p-4 m-2 transition-all ease-in-out duration-200 hover:bg-gray-400 hover:bg-opacity-20">
          <i className="fa-solid fa-person-running text-2xl pr-3" />
          <button onClick={handleClick} className="text-lg">My Runs</button>
          <div onClick={handleClick} className={`hidden absolute top-16 ${showMyRuns} z-10 flex-col bg-gray-100 text-black rounded-sm`}>
            <a className="hover:bg-blue-300 w-40 py-4 text-center" href="#home?tab=progress">Progress</a>
            <a className="hover:bg-blue-300 w-40 py-4 text-center" href="#home?tab=activities">Activities</a>
            <a className="hover:bg-blue-300 w-40 py-4 text-center" href="#home?tab=profile">Profile</a>
          </div>
        </div>
        <div className="flex items-center hover:cursor-pointer p-4 m-2 transition-all ease-in-out duration-200 hover:bg-gray-400 hover:bg-opacity-20">
          <i className="fa-solid fa-dumbbell text-lg pr-3" />
          <a href="#sign-in" className="text-lg">My Workouts</a>
        </div>
      </>
    );
  }
}
