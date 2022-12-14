import React from 'react';
import RunTabs from '../components/runs/run-tabs';
import Progress from '../components/runs/progress';
import Activities from '../components/runs/activities';
import Profile from '../components/runs/profile';
import Redirect from '../components/redirect';
import { AppContext } from '../lib';

export default class Home extends React.Component {
  render() {
    if (!this.context.user) return <Redirect to='sign-in' />;
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
Home.contextType = AppContext;
