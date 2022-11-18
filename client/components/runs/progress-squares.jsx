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
      hoveredIndex: null,
      dataHasLoaded: false
    };
    this.setMouseDown = this.setMouseDown.bind(this);
    this.setMouseUp = this.setMouseUp.bind(this);
    this.drag = this.drag.bind(this);
    this.showLabel = this.showLabel.bind(this);
    this.hideLabel = this.hideLabel.bind(this);
  }

  componentDidUpdate() { // scroll activity doesn't work before data has arrived to component (which happens AFTER component did mount)
    if (this.state.dataHasLoaded === false) {
      this.ref.current.scrollTo(1500, 0);
      this.setState({ dataHasLoaded: true });
    }
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

  showLabel(index) {
    this.setState({
      hoveredIndex: index
    });
  }

  hideLabel() {
    this.setState({
      hoveredIndex: null
    });
  }

  render() {
    const { progressData } = this.props;
    const { hoveredIndex } = this.state;
    const { showLabel, hideLabel, setMouseDown, setMouseUp, drag, ref } = this;
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
        <p className="font-lora text-lg font-medium mb-4">1 run this month | 12 runs this year</p>
        <div
        ref={ref}
        onMouseDown={event => setMouseDown(event)}
        onMouseUp={setMouseUp} onMouseMove={event => drag(event)}
        onMouseLeave={setMouseUp}
        className="overflow-scroll overflow-y-hidden overflow-x-hidden active:cursor-grabbing active:scale-[1.01]"
        >
          <div className="flex">
            <div className="flex flex-col justify-evenly gap-2 items-center mr-4 mt-10">
              <h1>Mon</h1>
              <h1>Wed</h1>
              <h1>Fri</h1>
            </div>
            <div className="grid grid-52 gap-2.5 relative mt-10">
              {progressData.length !== 0
                ? progressData.map((square, index) => {
                  return (
                    <div key={square.date} onMouseLeave={() => hideLabel()}>
                      { square.date.split('T')[0].split('-')[2] === '01' // add month labels on top of chart
                        ? <h1 className="absolute -top-8">{getMonthName(square.date.split('-')[1])}</h1>
                        : ''
                      }
                      <div className="relative">
                        {/* Square */}
                        <svg id={square.date} height="20" width="20">
                          <rect onMouseOver={() => showLabel(index)} width="20" height="20" rx="5" fill={square.runStatus === 'run' ? 'green' : 'lightgray'} />
                        </svg>
                        {/* Label */}
                        <div onMouseLeave={hideLabel} className={`${index === hoveredIndex ? 'flex' : 'hidden'} w-32 justify-center absolute ${index > 349 ? 'right-4 -top-[8px]' : '-right-14 -top-[36px]'} z-10 bg-black text-white opacity-70 p-2 rounded-lg`}>
                          <h1>{square.date.split('T')[0]}</h1>
                        </div>
                      </div>
                    </div>
                  );
                })
                : 'loading'
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
