import React, { createRef } from 'react';
import { scaleBand, scaleLinear, axisLeft, axisBottom, max, select, line } from 'd3';

// GitHub Ref -- https://github.com/f-kb24/d3-in-depth/blob/master/src/stories/components/Scales.tsx
// for updates -- > use https://www.youtube.com/watch?v=OM_6sbgqrHc&list=PLzCAqE_rafAc_2QWK8ii16m2ju4qhYAJT&index=5
// write up a filter from the most recent Sunday

const initialData = [
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
];

const dimensions = {
  height: 250,
  chartHeight: 225,
  marginLeft: 30,
  marginTop: 4
};

export default class WeekChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 250,
      chartWidth: 210,
      data: initialData
    };
    this.SVGref = createRef();
    this.DIVref = createRef();
    this.drawChart = this.drawChart.bind(this);
    this.resizeChart = this.resizeChart.bind(this);
  }

  componentDidMount() {
    const { DIVref, drawChart } = this;
    this.setState({
      width: DIVref.current.offsetWidth,
      chartWidth: DIVref.current.offsetWidth - 25
    }, () => drawChart());
  }

  drawChart() {
    const { chartHeight, height, marginLeft, marginTop } = dimensions;
    const { data, width, chartWidth } = this.state;
    const { DIVref, resizeChart } = this;

    window.addEventListener('resize', resizeChart);

    const chartSVG = select(DIVref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .classed('svg-chart', true);

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
      .attr('transform', `translate(${marginLeft + (chartWidth * 0.072)}, ${marginTop})`) // transforms entire graph
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
      .attr('transform', `translate(${marginLeft + (chartWidth * 0.072)}, ${marginTop})`) // transforms entire graph
      .attr('fill', 'red')
      .attr('stroke', 'none')
      .attr('cx', function (d) { return x(d.name); })
      .attr('cy', function (d) { return y(d.number); })
      .attr('r', 3);
  }

  resizeChart() {
    const { DIVref } = this;
    this.setState({
      width: DIVref.current.offsetWidth,
      chartWidth: DIVref.current.offsetWidth - 25
    });
    const currentChart = select('.svg-chart');
    window.removeEventListener('resize', this.resizeChart);
    currentChart.remove();
    this.drawChart();
  }

  render() {
    const { DIVref } = this;
    return (
      <div ref={DIVref} />
    );
  }
}
