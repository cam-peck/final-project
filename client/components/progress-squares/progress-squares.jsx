import React from 'react';
import ProgressSquare from './progress-square';
import ProgressSquareHeader from './progress-square-header';
import { formatRunningSquares, getSquaresSumData } from '../../lib';

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
    const { data } = this.props;
    if (data.length === 0) {
      return 'loading';
    }
    const runningSquareData = formatRunningSquares(data);
    const runningSquareSumData = getSquaresSumData(data);
    const { setMouseDown, setMouseUp, drag, ref } = this;
    return (
      <div className="bg-white pl-6 pr-6 pt-5 pb-3 rounded-xl border border-gray-300 shadow-sm">
        <ProgressSquareHeader data={runningSquareSumData}/>
        <hr className="border"/>
        <div ref={ref} onMouseDown={event => setMouseDown(event)} onMouseUp={setMouseUp} onMouseMove={event => drag(event)} onMouseLeave={setMouseUp} className="overflow-scroll overflow-y-hidden active:cursor-grabbing active:scale-[1.01]">
          <div className="flex">
            <div className="flex flex-col justify-evenly gap-2 items-center mr-4 mt-11">
              <h1>Mon</h1>
              <h1>Wed</h1>
              <h1>Fri</h1>
            </div>
            <div className="grid grid-52 gap-2.5 relative mt-11 pb-2">
              { runningSquareData.map((square, index) => { return <ProgressSquare key={square.date} square={square} index={index}/>; }) }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
