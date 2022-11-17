import React from 'react';

export default class ProgressSquares extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isDown: false,
      startX: 0,
      scrollLeft: 0
    };
    this.setMouseDown = this.setMouseDown.bind(this);
    this.setMouseUp = this.setMouseUp.bind(this);
    this.drag = this.drag.bind(this);
  }

  setMouseDown(event) {
    console.log('mouse down');
    console.log(event);
    this.setState({ isDown: true, startX: event.pageX, scrollLeft: this.ref.current.scrollLeft });
  }

  setMouseUp() {
    console.log('mouse up');
    this.setState({ isDown: false });
  }

  drag(event) {
    const { isDown, startX, scrollLeft } = this.state;
    if (!isDown) return;
    const walk = event.pageX - startX;
    this.ref.current.scrollLeft = scrollLeft - walk;
  }

  render() {
    const { progressData } = this.props;
    const { setMouseDown, setMouseUp, drag, ref } = this;
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
        <p className="font-lora text-lg font-medium mb-4">21 runs this month | 212 runs this year</p>
        <div
        ref={ref}
        onMouseDown={event => setMouseDown(event)}
        onMouseUp={setMouseUp} onMouseMove={event => drag(event)}
        onMouseLeave={setMouseUp}
          className="overflow-scroll overflow-y-hidden overflow-x-hidden active:cursor-grabbing active:scale-[1.01]">
          <div className="grid grid-52 gap-2.5">
            {progressData.length !== 0
              ? progressData.map((square, index) => {
                return (
                  <div key={square.date} onClick={() => console.log(square.date)}>
                    <svg height="20" width="20">
                      <rect width="20" height="20" rx="5" fill={square.runStatus === 'run' ? 'green' : 'lightgray'} />
                    </svg>
                  </div>
                );
              })
              : 'loading'
            }
          </div>
        </div>
      </div>
    );
  }
}
