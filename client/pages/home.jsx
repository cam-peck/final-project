import React from 'react';
import RunTabs from '../components/runs/run-tabs';
import Progress from '../components/runs/progress';
import Activities from '../components/runs/activities';
import Profile from '../components/runs/profile';

export default class Home extends React.Component {
  render() {
    return (
      <main>
        <RunTabs tab={this.props.tab}>
          <div label="progress">
            <Progress />
          </div>
          <div label="activities">
            <Activities />
          </div>
          <div label="profile">
            <Profile />
          </div>
        </RunTabs>
      </main>
    );
  }
}
