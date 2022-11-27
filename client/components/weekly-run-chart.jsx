import React from 'react';
import WeeklyRunChartHeader from './weekly-run-chart-header';
import WeekChart from './week-chart';

export default class WeeklyRunChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredIndex: null
    };
  }

  render() {
    const { data } = this.props;
    return (
      <div className="bg-white pl-6 pr-6 pt-5 pb-5 rounded-xl border border-gray-300 shadow-sm">
        <section className="mb-6">
          {
            data.length !== 0
              ? <WeeklyRunChartHeader data={data.thisWeekData} />
              : 'loading'
          }
        </section>
        <section>
          {
            data.length !== 0
              ? <WeekChart data={data.thisWeekData.thisWeekRuns} />
              : 'loading'
          }
        </section>
      </div>
    );
  }
}
