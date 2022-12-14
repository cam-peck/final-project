import React from 'react';
import RunForm from '../components/forms/run-form';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Runs extends React.Component {
  render() {
    const { route, user } = this.context;

    if (!user) return <Redirect to='sign-in' />;

    const titleMessage = route.params.get('mode') === 'add'
      ? 'Add Run'
      : 'Edit Run';

    return (
      <main>
        <div className="max-w-md md:max-w-4xl mx-auto px-6 mt-4">
          <h1 className="text-3xl font-lora font-bold mb-4">{titleMessage}</h1>
          <RunForm />
        </div>
      </main>
    );
  }

}
Runs.contextType = AppContext;
