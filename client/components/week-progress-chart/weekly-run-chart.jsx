import React from 'react';
import WeeklyRunChartHeader from './weekly-run-chart-header';
import WeekChart from './week-chart';
import { getWeeklyLineData } from '../../lib';

export default class WeeklyRunChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredIndex: null
    };
  }

  render() {
    const { data } = this.props;
    if (data.length === 0) {
      return;
    }
    const weeklyLineData = getWeeklyLineData(data);
    return (
      <div className="bg-white pl-6 pr-6 pt-5 pb-5 rounded-xl border border-gray-300 shadow-sm">
        <section className="mb-6">
          {
            data.length !== 0
              ? <WeeklyRunChartHeader data={weeklyLineData.weeklySumData} />
              : 'loading'
          }
        </section>
        <section>
          {
            data.length !== 0
              ? <WeekChart data={weeklyLineData.mappedWeek} />
              : 'loading'
          }
        </section>
      </div>
    );
  }
}
