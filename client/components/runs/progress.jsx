import React from 'react';
import { AppContext } from '../../lib';

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
      .then(result => this.setState({
        progressSquaresData: result
      }));
  }

  render() {
    const { progressSquaresData } = this.state;
    console.log(this.state);
    return (
      <section className="pl-6 pr-6 max-w-lg md:max-w-2xl lg:max-w-6xl m-auto mt-6">
        <h1 className="font-lora font-medium text-2xl mb-4">My Progress</h1>
        <div className="grid grid-52">
          {progressSquaresData.length !== 0
            ? progressSquaresData.map((square, index) => {
              return (
                <div key={square.date} onClick={() => console.log(square.date)}>
                  <svg height="25" width="25">
                    <rect width="15" height="15" rx="5" fill={square.runStatus === 'run' ? 'green' : 'lightgray'}/>
                  </svg>
                </div>
              );
            })
            : 'loading'
          }
        </div>
      </section>
    );
  }
}
Progress.contextType = AppContext;
