function getXDaysBack(daysBack) { // uses today's date to grab most recent Sunday
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - daysBack);
  return oneWeekAgo.toJSON().split('T')[0];
}

module.exports = getXDaysBack;
