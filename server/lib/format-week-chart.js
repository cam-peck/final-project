const getXDaysBack = require('./get-x-days-back');
const getCurrentYear = require('./get-current-year');

function formatWeekChart(weekData) {
  const result = [];

  // Add first run manually to prevent weird iteration bugs
  let previousDate = weekData[0].date.toJSON().split('T')[0].split('-').slice(1, 3).join('/');
  let accDate = {
    name: previousDate,
    number: weekData[0].distance
  };

  // Iterate through weekData --> push to run to result if only one run happened that day, else sum up the multiple runs
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

  // Fill in zeros
  const checkAgainst = []; //
  for (let i = 0; i < 7; i++) { // get array of last 7 days (including today)
    checkAgainst.push(getXDaysBack(i).split('-').slice(1, 3).join('/'));
  }
  const runArray = [];
  for (let i = 0; i < result.length; i++) { // get array of days that runs have occured
    runArray.push(result[i].name);
  }
  for (let i = 0; i < checkAgainst.length; i++) { // add runs to result with 0 distance for dates with no run
    if (!runArray.includes(checkAgainst[i])) {
      result.splice(i, 0, { name: checkAgainst[i], number: 0.00 });
    }
  }

  // Sort the result by date
  return result.sort((a, b) => {
    const d1 = new Date(a.name + '/' + getCurrentYear());
    const d2 = new Date(b.name.split('/')[0] === 1 ? b.name + '/' + (getCurrentYear() + 1) : b.name + '/' + getCurrentYear()); // check for new year
    return d1 - d2;
  });
}

module.exports = formatWeekChart;
