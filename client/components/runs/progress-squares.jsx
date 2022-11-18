import React from 'react';
import ProgressSquare from './progress-square';
import ProgressSquareHeader from './progress-square-header';

export default class ProgressSquares extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isDown: false,
      startX: 0,
      scrollLeft: 0,
      dataHasLoaded: false
    };
    this.setMouseDown = this.setMouseDown.bind(this);
    this.setMouseUp = this.setMouseUp.bind(this);
    this.drag = this.drag.bind(this);
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

  render() {
    const { progressData } = this.props;
    const { setMouseDown, setMouseUp, drag, ref } = this;
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
        {
          progressData.yearSumData !== undefined && progressData.monthSumData !== undefined
            ? <ProgressSquareHeader yearSumData={progressData.yearSumData} monthSumData={progressData.monthSumData}/>
            : 'loading'
        }
        <div ref={ref} onMouseDown={event => setMouseDown(event)} onMouseUp={setMouseUp} onMouseMove={event => drag(event)} onMouseLeave={setMouseUp} className="overflow-scroll overflow-y-hidden overflow-x-hidden active:cursor-grabbing active:scale-[1.01]">
          <div className="flex">
            <div className="flex flex-col justify-evenly gap-2 items-center mr-4 mt-10">
              <h1>Mon</h1>
              <h1>Wed</h1>
              <h1>Fri</h1>
            </div>
            <div className="grid grid-52 gap-2.5 relative mt-10">
              { progressData.length !== 0
                ? progressData.squaresData.map((square, index) => { return <ProgressSquare key={square.date} square={square} index={index}/>; })
                : 'loading'
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
