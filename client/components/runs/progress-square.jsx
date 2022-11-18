import React from 'react';
import { getMonthName } from '../../lib';

export default class ProgressSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredIndex: null
    };
    this.showLabel = this.showLabel.bind(this);
    this.hideLabel = this.hideLabel.bind(this);
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
    const { square, index } = this.props;
    const { hoveredIndex } = this.state;
    const { hideLabel, showLabel } = this;

    return (
      <div onMouseLeave={() => hideLabel()}>
        {square.date.split('T')[0].split('-')[2] === '01' // add month labels on top of chart
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
  }
}
