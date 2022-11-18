import React from 'react';
import WeeklyRunChartHeader from './weekly-run-chart-header';

export default class WeeklyRunChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredIndex: null
    };
  }

  render() {
    return (
      <div className="bg-white pl-6 pr-6 pt-5 pb-5 rounded-xl border border-gray-300 shadow-sm">
        <WeeklyRunChartHeader />
      </div>
    );
  }
}
