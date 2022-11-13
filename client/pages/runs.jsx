import React from 'react';
import RunForm from '../components/run-form';
import AppContext from '../lib/app-context';

export default class Runs extends React.Component {
  render() {
    const { route } = this.context;

    const titleMessage = route.path === 'add-run'
      ? 'Add Run'
      : 'Edit Run';

    return (
      <main>
        <div className="max-w-md md:max-w-6xl mx-auto px-6 mt-4">
          <h1 className="text-3xl font-lora font-bold mb-4">{titleMessage}</h1>
          <RunForm />
        </div>
      </main>
    );
  }

}
Runs.contextType = AppContext;
