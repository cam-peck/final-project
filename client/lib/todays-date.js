export default function todaysDate() {
  const date = new Date();
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  const today = `${year}-${month + 1}-${day}`;
  return today;
}
