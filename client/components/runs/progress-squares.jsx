import React from 'react';
import { getMonthName } from '../../lib';

export default class ProgressSquares extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isDown: false,
      startX: 0,
      scrollLeft: 0,
      labelContents: '',
      labelX: 0,
      labelY: 0
    };
    this.setMouseDown = this.setMouseDown.bind(this);
    this.setMouseUp = this.setMouseUp.bind(this);
    this.drag = this.drag.bind(this);
    this.showLabel = this.showLabel.bind(this);
    this.hideLabel = this.hideLabel.bind(this);
  }

  setMouseDown(event) {
    this.setState({ isDown: true, startX: event.pageX, scrollLeft: this.ref.current.scrollLeft });
  }

  setMouseUp() {
    this.setState({ isDown: false });
  }

  drag(event) {
    const { isDown, startX, scrollLeft } = this.state;
    if (!isDown) return;
    event.preventDefault();
    const walk = event.pageX - startX;
    this.ref.current.scrollLeft = scrollLeft - walk;
  }

  showLabel(label, event) {
    const labelDate = label.split('T')[0];
    console.log(event);
    this.setState({
      labelContents: labelDate,
      labelX: event.pageX,
      labelY: event.pageY
    });
  }

  hideLabel() {
    this.setState({
      labelContents: '',
      labelX: 0,
      labelY: 0
    });
  }

  render() {
    console.log('State: ', this.state);
    const { progressData } = this.props;
    const { labelContents, labelX, labelY } = this.state;
    const { showLabel, hideLabel, setMouseDown, setMouseUp, drag, ref } = this;
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
        <p className="font-lora text-lg font-medium mb-4">21 runs this month | 212 runs this year</p>
        <div
        ref={ref}
        onMouseDown={event => setMouseDown(event)}
        onMouseUp={setMouseUp} onMouseMove={event => drag(event)}
        onMouseLeave={setMouseUp}
        className="overflow-scroll overflow-y-hidden overflow-x-hidden active:cursor-grabbing active:scale-[1.01]"
        >
          <div className="flex">
            <div className="flex flex-col justify-evenly gap-2 items-center mr-4 mt-8">
              <h1>Mon</h1>
              <h1>Wed</h1>
              <h1>Fri</h1>
            </div>
            <div className="grid grid-52 gap-2.5 relative mt-8">
              {progressData.length !== 0
                ? progressData.map((square, index) => {
                  return (
                    <div key={square.date} onMouseLeave={() => hideLabel()}>
                      { square.date.split('T')[0].split('-')[2] === '01' // add month labels on top of chart
                        ? <h1 className="absolute -top-8">{getMonthName(square.date.split('-')[1])}</h1>
                        : ''
                      }
                      <svg className="relative" height="20" width="20">
                        <rect onMouseOver={event => showLabel(square.date, event)} width="20" height="20" rx="5" fill={square.runStatus === 'run' ? 'green' : 'lightgray'} />
                      </svg>
                    </div>
                  );
                })
                : 'loading'
            }
            </div>
            { labelContents !== ''
              ? <div className="bg-gray-200 shadow-xl p-2 rounded-lg" style={{ position: 'absolute', top: labelY - 60, left: labelX - 30 }}>
                <h1>{labelContents}</h1>
              </div>
              : ''
            }
          </div>
        </div>
      </div>
    );
  }
}
