import React from 'react';
import { AppContext } from '../../lib';
import ProgressSquares from '../progress-squares/progress-squares';
import WeeklyRunChart from '../weekly-run-chart';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearlyRunData: []
    };
  }

  componentDidMount() {
    const { user } = this.context;
    const req = {
      method: 'GET',
      headers: {
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      user
    };
    fetch('/api/progress', req)
      .then(response => response.json())
      .then(result => {
        this.setState({
          yearlyRunData: result
        });
      });
  }

  render() {
    const { yearlyRunData } = this.state;
    return (
      <section className="pl-6 pr-6 max-w-6xl m-auto mt-6">
        <h1 className="font-lora font-medium text-2xl mb-6">My Progress</h1>
        <div className='mb-4'>
          <ProgressSquares progressData={yearlyRunData}/>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className='md:pr-4 md:w-6/12'>
            <WeeklyRunChart data={yearlyRunData.trimmedSquaresData}/>
          </div>
          <div className='w-6/12' />
        </div>
      </section>
    );
  }
}
Progress.contextType = AppContext;
