import React from 'react';
import TextInput from '../inputs/text-input';
import RunMiniCard from '../cards/run-mini-card';
import RunMainCard from '../cards/run-main-card';
import { AppContext } from '../../lib';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';

export default class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runData: [],
      modalIsOpen: false,
      openRun: {},
      fetchingData: true,
      networkError: false
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
      .then(result => this.setState({ runData: result, fetchingData: false })
      )
      .catch(error => {
        console.error('There was an error!', error);
        this.setState({
          networkError: true
        });
      });
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
    this.setState({ fetchingData: true },
      () => {
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
            this.setState({ openRun: {}, runData: newRunData, fetchingData: false });
            this.closeModal();
          })
          .catch(error => {
            console.error('There was an error!', error);
            this.setState({
              networkError: true
            });
          });
      });
  }

  render() {
    if (this.state.networkError) {
      return <NetworkError />;
    }
    if (this.state.fetchingData) {
      return <LoadingSpinner />;
    }
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
          {
            runData.length === 0
              ? <p className="text-center italic">No runs found... Add a run using the &quot;+&quot; button in the bottom right.</p>
              : <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                {
                  runData.map(run => {
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
                  })
                }
              </div>
            }
          <div className="flex justify-end">
            <div className="flex justify-center items-center bg-blue-100 rounded-2xl shadow-2xl border-2 border-blue-200 fixed bottom-8">
              <a className="text-4xl xs:text-5xl flex justify-center items-center font-bold text-blue-800 w-[56px] h-[56px] xs:w-[70px] xs:h-[70px]" href="#run-form?mode=add"><i className="fa-solid fa-plus text-2xl xs:text-3xl" /></a>
            </div>
          </div>
        </section>
        {modal}
      </>
    );
  }
}
Activities.contextType = AppContext;
