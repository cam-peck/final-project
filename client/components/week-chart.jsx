import React, { useRef, useState, useEffect } from 'react';
import { scaleBand, scaleLinear, axisLeft, axisBottom, max, select } from 'd3';

// GitHub Ref -- https://github.com/f-kb24/d3-in-depth/blob/master/src/stories/components/Scales.tsx
// for updates -- > use https://www.youtube.com/watch?v=OM_6sbgqrHc&list=PLzCAqE_rafAc_2QWK8ii16m2ju4qhYAJT&index=5

const initialData = [
  {
    name: 'Sun',
    number: 7.22
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
    number: 0.00
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
  width: 800,
  height: 500,
  chartWidth: 700,
  chartHeight: 400,
  marginLeft: 100
};

export default function WeekChart(props) {

  const ref = useRef(null);
  const [selection, setSelection] = useState(null);
  const [data, setData] = useState(initialData);

  const { width, height, chartWidth, chartHeight, marginLeft } = dimensions;

  const x = scaleBand() // define range into uniform bands and will map it into the domain
    .domain(data.map(d => d.name)) // takes an array of identifiers for the data
    .range([0, chartWidth])
    .paddingInner(0.05); // closer to 1 --> less padding

  const y = scaleLinear() // by default domain and range is between 0 and one
    .domain([0, max(data, d => d.number)]) // takes an array [floor, ceiling]
    .range([chartHeight, 0]);

  const xAxis = axisBottom(x);
  const yAxis = axisLeft(y)
    .ticks(20) // d3 tries its best but will not always give an exact number
    .tickFormat(d => `${d}mi`); // takes a function where the arg is tick text --> return is what you see on the chart

  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
      // Axis //
      const xAxisGroup = selection
        .append('g')
        .attr('transform', `translate(${marginLeft}, ${chartHeight})`)
        .call(xAxis);

      xAxisGroup
        .selectAll('text')
        .attr('text-anchor', 'center')
        .attr('font-size', '15px');

      const yAxisGroup = selection
        .append('g')
        .attr('transform', `translate(${marginLeft}, 0)`)
        .call(yAxis);

      // Bars //
      selection
        .append('g') // wrap in a group so that we can apply trasformations later
        .attr('transform', `translate(${marginLeft})`) // transforms entire graph
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth) // x.bandwith fills the width to the appropriate range with no default padding
        .attr('height', 0)
        .attr('y', chartHeight)
        .transition()
        .duration(500)
        .attr('height', d => chartHeight - y(d.number))
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.number))
        .attr('fill', 'orange');
    }
  }, [selection]);

  return (
    <div>
      <svg ref={ref} width={width} height={height}/>
    </div>
  );
}
