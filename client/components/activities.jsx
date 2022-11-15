import React from 'react';
import TextInput from './text-input';
import RunMiniCard from './run-mini-card';
import RunMainCard from './run-main-card';
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
      .then(result => this.setState({ runData: result }));
  }

  render() {
    const { runData } = this.state;
    return (
      <>
        <section className="pl-6 pr-6 max-w-lg md:max-w-2xl lg:max-w-6xl m-auto mt-8">
          <TextInput placeholder="Searchbar"/>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {runData.map(run => {
              return (
                <RunMiniCard
            key={run.entryId}
            date={run.date}
            distance={run.distance}
            distanceUnits={run.distanceUnits}
            duration={run.duration}
            />
              );
            })}
          </div>
        </section>
        <modal>
          <RunMainCard />
        </modal>
      </>
    );
  }
}
Activities.contextType = AppContext;
