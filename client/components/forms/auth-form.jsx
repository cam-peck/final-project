import React from 'react';
import TextInput from '../inputs/text-input';
import DateInput from '../inputs/date-input';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      displayName: '',
      dateOfBirth: '',
      profilePhoto: 'example.png',
      signInWasInvalid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetState() {
    this.setState({
      email: '',
      password: '',
      displayName: '',
      dateOfBirth: '',
      profilePhoto: 'example.png',
      signInWasInvalid: false
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(response => response.json())
      .then(result => {
        if (action === 'sign-up') {
          this.resetState();
          window.location.hash = 'sign-in';

        } else if (result.user && result.token) {
          this.resetState();
          this.props.onSignIn(result);
          window.location.hash = '#home?tab=activities';
        } else {
          this.setState({ signInWasInvalid: true });
        }
      });

  }

  render() {
    const { action } = this.props; // either sign-in or sign-out
    const { handleChange, handleSubmit } = this;
    const { email, password, displayName, dateOfBirth, signInWasInvalid } = this.state;
    const formButton = action === 'sign-in'
      ? 'Log in'
      : 'Create Account';
    const registerAccountInputs = action === 'sign-in'
      ? ''
      : <>
        <TextInput type="text" name="displayName" placeholder="Display Name" value={displayName} showLabel={false} onChange={handleChange} />
        <DateInput type="date" name="dateOfBirth" placeholder="Date of Birth" value={dateOfBirth} dateMin="1922-01-01" dateMax="2018-01-01" showLabel={false} onChange={handleChange} />
      </>;
    const invalidSignIn = signInWasInvalid
      ? <p className="text-red-500 text-xs italic -mt-2.5 mb-4 ml-6">Invalid username or password</p>
      : '';
    return (
      <div className="max-w-md mx-auto">
        <form className="pl-4 pr-4" onSubmit={handleSubmit}>
          <TextInput type="email" name="email" placeholder="Email Address" value={email} showLabel={false} onChange={handleChange}/>
          <TextInput type="password" name="password" placeholder="Password" value={password} showLabel={false} onChange={handleChange} />
          {registerAccountInputs}
          {invalidSignIn}
          <div>
            <button className="w-full bg-blue-500 transition ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold text-lg">{formButton}</button>
          </div>
        </form>
      </div>
    );
  }
}
