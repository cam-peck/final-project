import React from 'react';
import RunTabs from '../components/run-tabs';
import Progress from '../components/progress';
import Activities from '../components/activities';
import Profile from '../components/profile';

export default class Home extends React.Component {
  render() {
    return (
      <main >
        <RunTabs tab={this.props.tab}>
          <div label="Progress">
            <h1>Progress</h1>
            <Progress />
          </div>
          <div label="Activities" className="mb-6">
            <h1>Activities</h1>
            <Activities />
          </div>
          <div label="Profile" className="mb-6">
            <h1>Profile</h1>
            <Profile />
          </div>
        </RunTabs>
      </main>
    );
  }
}
