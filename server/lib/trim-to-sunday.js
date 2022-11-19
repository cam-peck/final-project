function trimToSunday(progressData) { // takes raw progress data and trims first day to Sunday for proper square alignment
  const firstSundayIndex = progressData.findIndex(data => {
    const date = new Date(data.date);
    return date.getDay() === 0;
  });
  const slicedResult = progressData.slice(firstSundayIndex);
  return slicedResult;
}

module.exports = trimToSunday;
