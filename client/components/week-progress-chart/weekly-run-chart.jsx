import React from 'react';
import WeeklyRunChartHeader from './weekly-run-chart-header';
import WeekChart from './week-chart';
import { getWeeklyLineData } from '../../lib';

export default function WeeklyRunChart(props) {
  const { data } = props;
  const weeklyLineData = getWeeklyLineData(data);
  return (
    <div className="bg-white pl-6 pr-6 pt-5 pb-5 rounded-xl border border-gray-300 shadow-sm">
      <section className="mb-6">
        <WeeklyRunChartHeader data={weeklyLineData.weeklySumData} />
      </section>
      <section>
        <WeekChart data={weeklyLineData} />
      </section>
    </div>
  );
}
