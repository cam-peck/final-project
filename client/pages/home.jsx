import React from 'react';
import RunTabs from '../components/run-tabs';
import Progress from '../components/progress';
import Activities from '../components/activities';
import Profile from '../components/profile';

export default class Home extends React.Component {
  render() {
    return (
      <main>
        <RunTabs>
          <div label="Progress">
            <Progress />
          </div>
          <div label="Activities">
            <Activities />
          </div>
          <div label="Profile">
            <Profile />
          </div>
        </RunTabs>
      </main>
    );
  }
}
