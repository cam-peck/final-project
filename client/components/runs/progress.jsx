import React from 'react';
import { AppContext } from '../../lib';
import ProgressSquares from '../progress-squares/progress-squares';
import WeeklyRunChart from '../week-progress-chart/weekly-run-chart';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearlyRunData: [],
      fetchingData: true,
      networkError: false
    };
  }

  async componentDidMount() {
    const { user } = this.context;
    const req = {
      method: 'GET',
      headers: {
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      user
    };
    try {
      const response = await fetch('/api/progress', req);
      const result = await response.json();
      this.setState({
        yearlyRunData: result,
        fetchingData: false
      });
    } catch (err) {
      console.error('An error occured!', err);
      this.setState({ networkError: true });
    }
  }

  render() {
    if (this.state.networkError) {
      return <NetworkError />;
    }
    if (this.state.fetchingData) {
      return <LoadingSpinner />;
    }
    const { yearlyRunData } = this.state;
    return (
      <section className="pl-6 pr-6 max-w-6xl mx-auto mt-6 mb-4">
        <h1 className="font-lora font-medium text-2xl mb-6">My Progress</h1>
        <div className='mb-4'>
          <ProgressSquares data={yearlyRunData}/>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className='w-full md:pr-4 md:w-6/12 lg:w-5/12'>
            <WeeklyRunChart data={yearlyRunData}/>
          </div>
          <div className='w-6/12' />
        </div>
      </section>
    );
  }
}
Progress.contextType = AppContext;
