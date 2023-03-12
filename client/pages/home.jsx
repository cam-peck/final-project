import React, { useContext } from 'react';
import RunTabs from '../components/runs/run-tabs';
import Progress from '../components/runs/progress';
import Activities from '../components/runs/activities';
import Profile from '../components/runs/profile';
import Redirect from '../components/redirect';
import { AppContext } from '../lib';

export default function Home(props) {
  const { user } = useContext(AppContext);
  const { tab } = props;

  if (!user) return <Redirect to='#' />;
  return (
    <main>
      <RunTabs tab={tab}>
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
