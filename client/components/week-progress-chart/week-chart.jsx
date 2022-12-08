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
      marginLeft: 36,
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

  componentWillUnmount() {
    const { resizeChart } = this;
    window.removeEventListener('resize', resizeChart);
  }

  drawChart() {
    const { chartHeight, height, marginLeft, marginTop } = this.dimensions;
    const { SVGwidth, chartWidth } = this.state;
    const { DIVref } = this;
    const { data } = this.props;
    if (data.weeklySumData.distance === 0) {
      return;
    }

    const chartSVG = select(DIVref.current)
      .append('svg')
      .attr('width', SVGwidth)
      .attr('height', height)
      .classed('svg-chart', true);

    const x = scaleBand()
      .domain(data.mappedWeek.map(d => d.date))
      .range([0, chartWidth - 0.5 * marginLeft]);

    const y = scaleLinear()
      .domain([0, Math.floor((max(data.mappedWeek, d => d.distance) + 1))])
      .range([chartHeight, 0]);

    const xAxis = axisBottom(x)
      .tickSizeOuter(0);

    const yAxis = axisLeft(y)
      .tickSizeOuter(0)
      .ticks(10)
      .tickFormat((interval, i) => {
        return i % 2 !== 0 ? '' : `${interval}mi`;
      });

    // Axis //
    const xAxisGroup = chartSVG
      .append('g')
      .attr('transform', `translate(${marginLeft}, ${chartHeight + marginTop})`)
      .call(xAxis);

    xAxisGroup
      .selectAll('text')
      .attr('text-anchor', 'center')
      .classed('text-[10px] xxs:text-[12px]', true);

    const yAxisGroup = chartSVG
      .append('g')
      .attr('transform', `translate(${marginLeft}, ${marginTop})`)
      .call(yAxis);

    yAxisGroup
      .selectAll('text')
      .attr('text-anchor', 'center')
      .attr('font-size', '11px');

    // Line //
    chartSVG
      .append('path')
      .data([data.mappedWeek])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('transform', `translate(${marginLeft + (chartWidth * 0.070)}, ${marginTop})`)
      .attr('stroke-width', 2.5)
      .attr('stroke', 'steelblue')
      .attr('d', line()
        .x(d => { return x(d.date); })
        .y(d => { return y(d.distance); })
      );

    // Data Points //
    chartSVG
      .selectAll('circle')
      .data(data.mappedWeek)
      .enter()
      .append('circle')
      .attr('transform', `translate(${marginLeft + (chartWidth * 0.070)}, ${marginTop})`) // transforms entire graph
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
    const currentChart = select('.svg-chart');
    currentChart.remove();
    this.setState({
      SVGwidth: DIVref.current.offsetWidth,
      chartWidth: DIVref.current.offsetWidth - 25
    }, () => drawChart());
  }

  render() {
    const { DIVref } = this;
    const { data } = this.props;
    return (
      <section>
        <div ref={DIVref} />
        {
          data.weeklySumData.distance === 0
            ? <p className="italic text-center">No runs found in the last 7 days...</p>
            : ''
        }
      </section>
    );
  }
}
