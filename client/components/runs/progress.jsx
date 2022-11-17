import React from 'react';
import { AppContext } from '../../lib';
import ProgressSquares from './progress-squares';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressSquaresData: [],
      weeklyRunData: []
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
    fetch('/api/runningSquares', req)
      .then(response => response.json())
      .then(result => {
        result.shift();
        result.shift();
        result.shift();
        result.shift();
        this.setState({
          progressSquaresData: result
        });
      });
  }

  render() {
    console.log(this.state);
    const { progressSquaresData } = this.state;
    return (
      <section className="pl-6 pr-6 max-w-lg md:max-w-2xl lg:max-w-6xl m-auto mt-6">
        <h1 className="font-lora font-medium text-2xl mb-6">My Progress</h1>
        <ProgressSquares progressData={progressSquaresData}/>
      </section>
    );
  }
}
Progress.contextType = AppContext;
