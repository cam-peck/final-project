import React, { useRef, useState, useEffect } from 'react';
import { scaleBand, scaleLinear, axisLeft, axisBottom, max, select, line } from 'd3';

// GitHub Ref -- https://github.com/f-kb24/d3-in-depth/blob/master/src/stories/components/Scales.tsx
// for updates -- > use https://www.youtube.com/watch?v=OM_6sbgqrHc&list=PLzCAqE_rafAc_2QWK8ii16m2ju4qhYAJT&index=5
// write up a filter from the most recent Sunday

const initialData = [
  {
    name: 'Sun',
    number: 4.22
  },
  {
    name: 'Mon',
    number: 5.03
  },
  {
    name: 'Tue',
    number: 4.11
  },
  {
    name: 'Wed',
    number: 5.67
  },
  {
    name: 'Thu',
    number: 2.20
  },
  {
    name: 'Fri',
    number: 4.12
  },
  {
    name: 'Sat',
    number: 5.87
  }
];

const dimensions = {
  width: 500,
  height: 375,
  chartWidth: 330,
  chartHeight: 350,
  marginLeft: 25,
  marginTop: 5
};

export default function WeekChart(props) {

  const ref = useRef(null);
  const [selection, setSelection] = useState(null);
  const [data, setData] = useState(initialData);

  const { width, height, chartWidth, chartHeight, marginLeft, marginTop } = dimensions;

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
    .ticks(30) // d3 tries its best but will not always give an exact number
    .tickFormat((interval, i) => {
      return i % 5 !== 0 ? '' : `${interval}mi`;
    });

  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current)); // sets the current selection as our svg
    } else {

      // Axis //
      const xAxisGroup = selection // adds the x-axis to our chart
        .append('g')
        .attr('transform', `translate(${marginLeft}, ${chartHeight + marginTop})`)
        .call(xAxis);

      xAxisGroup // formats the x-axis
        .selectAll('text')
        .attr('text-anchor', 'center')
        .attr('font-size', '12px');

      const yAxisGroup = selection // adds the y-axis to our chart
        .append('g')
        .attr('transform', `translate(${marginLeft}, ${marginTop})`)
        .call(yAxis);

      yAxisGroup // formats the y-axis
        .selectAll('text')
        .attr('text-anchor', 'center')
        .attr('font-size', '10px');

      // Line //
      selection
        .append('path')
        .data([data])
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('transform', `translate(${marginLeft + 23.5}, ${marginTop})`) // transforms entire graph
        .attr('stroke-width', 2.0)
        .attr('stroke', 'steelblue')
        .attr('d', line()
          .x(function (d) { return x(d.name); })
          .y(function (d) { return y(d.number); })
        );

      // Data Points //
      selection
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
  }, [selection]);

  return (
    <div>
      <svg ref={ref} width='100%' height='100%' viewBox={`0, 0, ${Math.min(width, height)}, ${Math.min(width, height)}`}/>
    </div>
  );
}
