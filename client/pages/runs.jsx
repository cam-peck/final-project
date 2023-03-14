import React, { useContext, useEffect } from 'react';
import RunForm from '../components/forms/run-form';
import AppContext from '../lib/app-context';
import { useNavigate } from 'react-router-dom';

export default function Runs(props) {
  const { user } = useContext(AppContext);
  const { mode } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home/activities');
  }, [user, navigate]);

  return (
    <main>
      <div className="max-w-md md:max-w-4xl mx-auto px-6 mt-4">
        <RunForm mode={mode} />
      </div>
    </main>
  );
}
