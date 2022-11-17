function getSquaresData(runData, restData) {
  const endDate = new Date(); // today
  endDate.setHours(0, 0, 0, 0);

  const aYearBack = new Date();
  aYearBack.setHours(0, 0, 0, 0);
  aYearBack.setFullYear(aYearBack.getFullYear() - 1);
  const date = aYearBack; // start-date for iteration --> one year back

  const dates = [];

  // eslint-disable-next-line no-unmodified-loop-condition
  while (date <= endDate) {
    const dateAsJSON = date.toJSON(); // grab 'YEAR-MO-DA' format

    const loopResult = {};
    if (runData.includes(dateAsJSON)) {
      loopResult[dateAsJSON] = 'run';
    } else if (restData.includes(dateAsJSON)) {
      loopResult[dateAsJSON] = 'rest';
    } else {
      loopResult[dateAsJSON] = 'norun';
    }

    dates.push(loopResult);

    date.setDate(date.getDate() + 1); // increment date by 1
  }

  return dates;
}

module.exports = getSquaresData;

// Tests //

// const runData = ['2022-02-10T00:00:00.000Z', '2022-01-10T00:00:00.000Z', '2022-01-18T00:00:00.000Z'];
// const restData = ['2022-02-03T00:00:00.000Z'];

// console.log(getSquaresData(runData, restData));
