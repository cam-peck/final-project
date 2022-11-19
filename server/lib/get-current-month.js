function getCurrentMonth() {
  const date = new Date();
  const currentMonth = date.getMonth() + 1; // 0 indexed
  return currentMonth;
}

module.exports = getCurrentMonth;
