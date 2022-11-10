export default function isDateOfBirthInvalid(date) {
  const minYear = 1900;
  const maxYear = 2020;
  const enteredYear = date.split('-')[0];
  if (enteredYear === '' || Number(enteredYear[0]) === 0) { // catch when user is typing the date
    return false;
  }
  if (Number(enteredYear) > minYear && Number(enteredYear) < maxYear) {
    return false;
  }
  return true;
}
