import React, { useContext } from 'react';
import RunForm from '../components/forms/run-form';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default function Runs(props) {
  const { user } = useContext(AppContext);
  const { mode, entryId } = props;

  if (!user) return <Redirect to='sign-in' />;

  return (
    <main>
      <div className="max-w-md md:max-w-4xl mx-auto px-6 mt-4">
        <RunForm mode={mode} entryId={entryId}/>
      </div>
    </main>
  );
}
