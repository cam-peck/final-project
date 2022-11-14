import React from 'react';
import RunTabs from '../components/run-tabs';

export default class Home extends React.Component {
  render() {
    return (
      <main>
        <RunTabs tab={this.props.tab}>
          <div label="Progress" className="mb-6">
            <h1>Progress</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quisquam aspernatur voluptas expedita maxime praesentium, qui id nemo similique dolore magnam, aut in itaque libero saepe dolorem. Ipsum, architecto rerum!</p>
          </div>
          <div label="Activities" className="mb-6">
            <h1>Activities</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quisquam aspernatur voluptas expedita maxime praesentium, qui id nemo similique dolore magnam, aut in itaque libero saepe dolorem. Ipsum, architecto rerum!</p>
          </div>
          <div label="Profile" className="mb-6">
            <h1>Profile</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quisquam aspernatur voluptas expedita maxime praesentium, qui id nemo similique dolore magnam, aut in itaque libero saepe dolorem. Ipsum, architecto rerum!</p>
          </div>
        </RunTabs>
      </main>
    );
  }
}

// export default class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeTab: null
//     };
//     this.setOpenTab = this.setOpenTab.bind(this);
//   }

//   setOpenTab(event) {
//     this.setState({ activeTab: event.target.textContent });
//   }

//   render() {
//     const { activeTab } = this.state;
//     const active = 'border-b-2 border-purple-700';
//     const inactive = 'border-b-2 border-blue-200';
//     let contentPage;
//     let progressNavState, activitiesNavState, profileNavState;

//     if (activeTab === 'Progress') {
//       contentPage = 'progress';
//       progressNavState = active;
//       profileNavState = inactive;
//       activitiesNavState = inactive;
//     } else if (activeTab === 'Profile') {
//       contentPage = <RunForm />;
//       profileNavState = active;
//       progressNavState = inactive;
//       activitiesNavState = inactive;
//     } else {
//       contentPage = 'activities';
//       progressNavState = inactive;
//       profileNavState = inactive;
//       activitiesNavState = active;
//     }

//     return (
//       <main>
//         <nav className="" onClick={this.setOpenTab}>
//           <button className={`w-1/3 text-center p-4 bg-blue-200 transition-border-color ease-in-out duration-100 ${progressNavState}`}>Progress</button>
//           <button className={`w-1/3 text-center p-4 bg-blue-200 transition-border-color ease-in-out duration-100 ${activitiesNavState}`}>Activities</button>
//           <button className={`w-1/3 text-center p-4 bg-blue-200 transition-border-color ease-in-out duration-100 ${profileNavState}`}>Profile</button>
//         </nav>
//         <div className="pl-4 pr-4">
//           {contentPage}
//         </div>
//       </main>
//     );
//   }
// }
