function getOneWeekBack() { // uses today's date to grab most recent Sunday
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
  return oneWeekAgo.toJSON().split('T')[0];
}

module.exports = getOneWeekBack;
