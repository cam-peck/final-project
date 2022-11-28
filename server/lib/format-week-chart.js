function formatWeekChart(weekData) { // use null instead of 0 to show difference between no-run and day that has not yet arrived
  const result = [];

  let previousDate = weekData[0].date.toJSON().split('T')[0].split('-').slice(1, 3).join('/');
  let accDate = {
    name: previousDate,
    number: weekData[0].distance
  };

  for (let i = 1; i < weekData.length; i++) {
    const currentDate = weekData[i].date.toJSON().split('T')[0].split('-').slice(1, 3).join('/');
    if (currentDate !== previousDate) { // only one run on that day
      result.push(accDate);
      accDate = {};
      previousDate = currentDate;
      accDate.name = currentDate;
      accDate.number = weekData[i].distance;
    } else { // additional run on currentDate
      accDate.number += weekData[i].distance;
      if (i === weekData.length - 1) { // catch final date
        result.push(accDate);
      }
    }
  }
  return result;
}

module.exports = formatWeekChart;
