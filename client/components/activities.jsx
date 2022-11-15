import React from 'react';
import TextInput from './text-input';
import RunMiniCard from './run-mini-card';
import AppContext from '../lib/app-context';

export default class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runData: []
    };
  }

  componentDidMount() {
    const req = {
      method: 'GET',
      headers: {
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      user: this.context.user
    };
    fetch('/api/runs', req)
      .then(response => response.json())
      .then(result => console.log(result));
  }

  render() {
    return (
      <section className="pl-6 pr-6 mb-8 max-w-md md:max-w-6xl m-auto">
        <TextInput />
        <RunMiniCard />
      </section>
    );
  }
}
Activities.contextType = AppContext;
