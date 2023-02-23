import React from 'react';
import ProgressSquare from './progress-square';
import ProgressSquareHeader from './progress-square-header';
import RestDayModal from './rest-day-modal';
import { formatRunningSquares, getSquaresSumData } from '../../lib';

export default class ProgressSquares extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isDown: false,
      startX: 0,
      scrollLeft: 0,
      restMenuIsOpen: false
    };
    this.setMouseDown = this.setMouseDown.bind(this);
    this.setMouseUp = this.setMouseUp.bind(this);
    this.drag = this.drag.bind(this);
    this.toggleRestDayModal = this.toggleRestDayModal.bind(this);
  }

  componentDidMount() {
    this.ref.current.scrollLeft = this.ref.current.scrollWidth;
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

  toggleRestDayModal() {
    this.setState({ restMenuIsOpen: !this.state.restMenuIsOpen });
  }

  render() {
    const { runData } = this.props;
    const runningSquareData = formatRunningSquares(runData);
    const runningSquareSumData = getSquaresSumData(runData);
    const { setMouseDown, setMouseUp, drag, ref, toggleRestDayModal } = this;
    const { restMenuIsOpen } = this.state;

    return (
      <div className="bg-white pl-6 pr-6 pt-5 pb-3 rounded-xl border border-gray-300 shadow-sm">
        <ProgressSquareHeader sumData={runningSquareSumData} toggleRestDayModal={toggleRestDayModal}/>
        {restMenuIsOpen ? <RestDayModal closeModal={toggleRestDayModal}/> : '' }
        <hr className="border"/>
        <div ref={ref} onMouseDown={event => setMouseDown(event)} onMouseUp={setMouseUp} onMouseMove={event => drag(event)} onMouseLeave={setMouseUp} className="overflow-scroll active:cursor-grabbing active:scale-[1.01]">
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
