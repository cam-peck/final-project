function getCurrentYear() {
  const date = new Date();
  const thisYear = date.getFullYear();
  return thisYear;
}

module.exports = getCurrentYear;
