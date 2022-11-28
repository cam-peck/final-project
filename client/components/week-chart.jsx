import React, { createRef } from 'react';
import { scaleBand, scaleLinear, axisLeft, axisBottom, max, select, line } from 'd3';

export default class WeekChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SVGwidth: 0,
      chartWidth: 0
    };
    this.SVGref = createRef();
    this.DIVref = createRef();
    this.drawChart = this.drawChart.bind(this);
    this.resizeChart = this.resizeChart.bind(this);
    this.dimensions = {
      height: 250,
      chartHeight: 225,
      marginLeft: 30,
      marginTop: 4
    };
  }

  componentDidMount() {
    const { DIVref, drawChart, resizeChart } = this;
    this.setState({
      SVGwidth: DIVref.current.offsetWidth,
      chartWidth: DIVref.current.offsetWidth - 25
    }, () => drawChart());
    window.addEventListener('resize', resizeChart);
  }

  drawChart() {
    const { chartHeight, height, marginLeft, marginTop } = this.dimensions;
    const { SVGwidth, chartWidth } = this.state;
    const { DIVref } = this;
    const { data } = this.props;

    const chartSVG = select(DIVref.current)
      .append('svg')
      .attr('width', SVGwidth)
      .attr('height', height)
      .classed('svg-chart', true);

    const x = scaleBand() // define range into uniform bands and will map it into the domain
      .domain(data.map(d => d.date)) // takes an array of identifiers for the data
      .range([0, chartWidth]);

    const y = scaleLinear() // by default domain and range is between 0 and 1
      .domain([0, Math.floor((max(data, d => d.distance) + 1))]) // takes an array [floor, ceiling]
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
      .attr('font-size', '11px');

    // Line //
    chartSVG
      .append('path')
      .data([data])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('transform', `translate(${marginLeft + (chartWidth * 0.072)}, ${marginTop})`) // transforms entire graph
      .attr('stroke-width', 2.5)
      .attr('stroke', 'steelblue')
      .attr('d', line()
        .x(d => { return x(d.date); })
        .y(d => { return y(d.distance); })
      );

    // Data Points //
    chartSVG
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('transform', `translate(${marginLeft + (chartWidth * 0.072)}, ${marginTop})`) // transforms entire graph
      .attr('fill', 'lightblue')
      .attr('stroke', 'darkblue')
      .attr('stroke-width', 1.5)
      .attr('cx', function (d) { return x(d.date); })
      .attr('cy', function (d) { return y(d.distance); })
      .attr('r', 3.5);
  }

  resizeChart() {
    const { DIVref, drawChart } = this;
    if (!DIVref || !DIVref.current) {
      return;
    }
    this.setState({
      SVGwidth: DIVref.current.offsetWidth,
      chartWidth: DIVref.current.offsetWidth - 25
    });
    const currentChart = select('.svg-chart');
    currentChart.remove();
    drawChart();
  }

  render() {
    const { DIVref } = this;
    return (
      <div ref={DIVref} />
    );
  }
}
