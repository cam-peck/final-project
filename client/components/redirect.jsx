export default function Redirect(props) {
  const url = new URL(window.location);
  if (props.to === '') {
    url.hash = 'home?tab=activites';
  } else {
    url.hash = props.to;
  }
  window.location.replace(url);
  return null;
}
