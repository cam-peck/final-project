function getRecentSunday() { // uses today's date to grab most recent Sunday
  const today = new Date();
  today.setDate(today.getDate() - today.getDay());
  return today.toJSON().split('T')[0];
}

module.exports = getRecentSunday;
