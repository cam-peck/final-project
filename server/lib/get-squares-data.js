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
    loopResult.date = dateAsJSON;
    if (runData.includes(dateAsJSON)) {
      loopResult.runStatus = 'run';
    } else if (restData.includes(dateAsJSON)) {
      loopResult.runStatus = 'rest';
    } else {
      loopResult.runStatus = 'norun';
    }

    dates.push(loopResult);

    date.setDate(date.getDate() + 1); // increment date by 1
  }
  return dates;
}

module.exports = getSquaresData;
