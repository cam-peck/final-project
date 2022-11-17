import React from 'react';
import TextInput from './inputs/text-input';
import RunMiniCard from './cards/run-mini-card';
import RunMainCard from './cards/run-main-card';
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
    this.deleteRun = this.deleteRun.bind(this);
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

  deleteRun(entryId) {
    const { user } = this.context;
    const { runData } = this.state;
    const req = {
      method: 'DELETE',
      headers: {
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      user
    };
    fetch(`/api/runs/${entryId}`, req)
      .then(response => response.json())
      .then(result => {
        const indexToRemove = runData.findIndex(run => run.entryId === entryId);
        const newRunData = Array.from(runData);
        newRunData.splice(indexToRemove, 1);
        this.setState({ openRun: {}, runData: newRunData });
        this.closeModal();
      });
  }

  render() {
    const { runData } = this.state;
    const modal = this.state.modalIsOpen === true
      ? <RunMainCard
          entryId={this.state.openRun.entryId}
          title={this.state.openRun.title}
          date={this.state.openRun.date}
          distance={this.state.openRun.distance}
          duration={this.state.openRun.duration}
          distanceUnits={this.state.openRun.distanceUnits}
          description={this.state.openRun.description}
          closeModal={this.closeModal}
          deleteRun={this.deleteRun}
        />
      : '';
    return (
      <>
        <section className="pl-6 pr-6 max-w-lg md:max-w-2xl lg:max-w-6xl m-auto mt-6">
          <h1 className="font-lora font-medium text-2xl mb-4">My Activities</h1>
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
          <div className="flex justify-end">
            <div className="flex justify-center items-center bg-blue-100 w-20 h-20 rounded-2xl shadow-2xl border-2 border-blue-200 fixed bottom-8">
              <a className="text-5xl font-bold text-blue-800" href="#run-form?mode=add">+</a>
            </div>
          </div>
        </section>
        {modal}
      </>
    );
  }
}
Activities.contextType = AppContext;
