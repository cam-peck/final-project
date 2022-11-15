import React from 'react';
import TextInput from './text-input';
import RunMiniCard from './run-mini-card';
import RunMainCard from './run-main-card';
import AppContext from '../lib/app-context';

export default class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runData: [],
      modalIsOpen: false,
      openRun: {}
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  openModal(entryId) {
    this.state.runData.forEach(run => {
      if (run.entryId === entryId) {
        this.setState({ modalIsOpen: true, openRun: run });
      }
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, openRun: {} });
  }

  render() {
    const { runData } = this.state;
    const modal = this.state.modalIsOpen === true
      ? <RunMainCard
          title={this.state.openRun.title}
          date={this.state.openRun.date}
          distance={this.state.openRun.distance}
          distanceUnits={this.state.openRun.distanceUnits}
          pace='8:15 / mi'
          description={this.state.openRun.description}
          closeModal={this.closeModal}
        />
      : '';
    return (
      <>
        <section className="pl-6 pr-6 max-w-lg md:max-w-2xl lg:max-w-6xl m-auto mt-8">
          <TextInput placeholder="Searchbar"/>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {runData.map(run => {
              return (
                <RunMiniCard
            key={run.entryId}
            entryId={run.entryId}
            date={run.date}
            distance={run.distance}
            distanceUnits={run.distanceUnits}
            duration={run.duration}
            openModal={this.openModal}
            />
              );
            })}
          </div>
        </section>
        {modal}
      </>
    );
  }
}
Activities.contextType = AppContext;
