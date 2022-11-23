import React, { createRef } from 'react';
import { scaleBand, scaleLinear, axisLeft, axisBottom, max, select, line } from 'd3';

// GitHub Ref -- https://github.com/f-kb24/d3-in-depth/blob/master/src/stories/components/Scales.tsx
// for updates -- > use https://www.youtube.com/watch?v=OM_6sbgqrHc&list=PLzCAqE_rafAc_2QWK8ii16m2ju4qhYAJT&index=5
// write up a filter from the most recent Sunday

const initialData = [
  {
    name: 'Su',
    number: 7.22
  },
  {
    name: 'Mo',
    number: 5.03
  },
  {
    name: 'Tu',
    number: 4.11
  },
  {
    name: 'We',
    number: 5.67
  },
  {
    name: 'Th',
    number: 2.20
  },
  {
    name: 'Fr',
    number: 4.12
  },
  {
    name: 'Sa',
    number: 5.87
  }
];

const dimensions = {
  width: 280,
  height: 250,
  chartWidth: 200,
  chartHeight: 225,
  marginLeft: 30,
  marginTop: 5
};

export default class WeekChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initialData
    };
    this.SVGref = createRef();
    this.DIVref = createRef();
  }

  componentDidMount() {
    const chartSVG = select(this.SVGref.current);
    const { chartWidth, chartHeight, marginLeft, marginTop } = dimensions;
    const { data } = this.state;

    const x = scaleBand() // define range into uniform bands and will map it into the domain
      .domain(data.map(d => d.name)) // takes an array of identifiers for the data
      .range([0, chartWidth]);

    const y = scaleLinear() // by default domain and range is between 0 and 1
      .domain([0, Math.floor((max(data, d => d.number) + 1))]) // takes an array [floor, ceiling]
      .range([chartHeight, 0]);

    const xAxis = axisBottom(x)
      .tickSizeOuter(0);

    const yAxis = axisLeft(y)
      .tickSizeOuter(0)
      .ticks(10) // d3 tries its best but will not always give an exact number
      .tickFormat((interval, i) => {
        return i % 2 !== 0 ? '' : `${interval}mi`;
      });

    // Axis //
    const xAxisGroup = chartSVG // adds the x-axis to our chart
      .append('g')
      .attr('transform', `translate(${marginLeft}, ${chartHeight + marginTop})`)
      .call(xAxis);

    xAxisGroup // formats the x-axis
      .selectAll('text')
      .attr('text-anchor', 'center')
      .attr('font-size', '14px');

    const yAxisGroup = chartSVG // adds the y-axis to our chart
      .append('g')
      .attr('transform', `translate(${marginLeft}, ${marginTop})`)
      .call(yAxis);

    yAxisGroup // formats the y-axis
      .selectAll('text')
      .attr('text-anchor', 'center')
      .attr('font-size', '10px');

    // Line //
    chartSVG
      .append('path')
      .data([data])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('transform', `translate(${marginLeft + 23.5}, ${marginTop})`) // transforms entire graph
      .attr('stroke-width', 2.0)
      .attr('stroke', 'steelblue')
      .attr('d', line()
        .x(d => { return x(d.name); })
        .y(d => { return y(d.number); })
      );

    // Data Points //
    chartSVG
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('transform', `translate(${marginLeft + 23.5}, ${marginTop})`) // transforms entire graph
      .attr('fill', 'red')
      .attr('stroke', 'none')
      .attr('cx', function (d) { return x(d.name); })
      .attr('cy', function (d) { return y(d.number); })
      .attr('r', 3);
  }

  render() {
    const { width, height } = dimensions;
    return (
      <div ref={this.DIVref}>
        <svg ref={this.SVGref} width={width} height={height} />
      </div>
    );
  }
}
