export default function getSquaresSumData(runData) {
  let yearSum = 0;
  let monthSum = 0;
  const currentYear = (new Date()).getFullYear();
  const currentMonth = ((new Date()).getMonth()) + 1;
  for (let i = 0; i < runData.runDates.length; i++) {
    if (Number(runData.runDates[i].date.split('T')[0].split('-')[0]) === currentYear) {
      yearSum++;
    }
    if (Number(runData.runDates[i].date.split('T')[0].split('-')[1]) === currentMonth) {
      monthSum++;
    }
  }
  return { yearSum, monthSum };
}
