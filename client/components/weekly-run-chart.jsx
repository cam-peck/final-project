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
    const data = initialData; // replace with actual data
    return (
      <div className="bg-white pl-6 pr-6 pt-5 pb-5 rounded-xl border border-gray-300 shadow-sm">
        <section className="mb-6">
          <WeeklyRunChartHeader data={data.weekSums}/>
        </section>
        <section>
          <WeekChart data={data.weekDailyRuns}/>
        </section>
      </div>
    );
  }
}

const initialData = { // replace with actual data passed down -- just an example format!
  weekDailyRuns: [
    {
      name: 'Su',
      number: 7.10
    },
    {
      name: 'Mo',
      number: 4.22
    },
    {
      name: 'Tu',
      number: 5.80
    },
    {
      name: 'We',
      number: 0.00
    },
    {
      name: 'Th',
      number: 0.00
    },
    {
      name: 'Fr',
      number: 3.89
    },
    {
      name: 'Sa',
      number: 5.45
    }
  ],
  weekSums: {
    distance: 27.2,
    distanceUnits: 'miles',
    runTime: '3h 15m',
    elevation: 381,
    elevationUnits: 'ft'
  }
};
