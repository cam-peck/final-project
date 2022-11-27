function formatWeekChart(weekData) { // use null instead of 0 to show difference between no-run and day that has not yet arrived
  const weekObj = [
    {
      name: 'Su',
      number: 7.2
    },
    {
      name: 'Mo',
      number: 6.2
    },
    {
      name: 'Tu',
      number: 0.00
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
      number: 0.00
    },
    {
      name: 'Sa',
      number: 0.00
    }
  ];
  return weekObj;
}

module.exports = formatWeekChart;
