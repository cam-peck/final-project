export default function removeTz(dateString) {
  const dt = new Date(dateString);
  return new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
}
