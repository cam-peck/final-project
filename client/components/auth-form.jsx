import React from 'react';
import { isDateOfBirthInvalid } from '../lib';
import FloatingInput from './floating-input';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      displayName: '',
      dateOfBirth: '',
      profilePhoto: 'example.png'
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
      accountWasCreated: true
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
    if (action === 'sign-up') {
      const { dateOfBirth } = this.state;
      if (isDateOfBirthInvalid(dateOfBirth) || Number(dateOfBirth.split('-')[0]) < 1000) { // additional check for unfinished years
        return;
      }
    }
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
          window.location.hash = '#';
        } else {
          // eslint-disable-next-line no-console
          console.log('invalid signin');
        }
      });

  }

  render() {
    const { action } = this.props; // either sign-in or sign-out
    const { handleChange, handleSubmit } = this;
    const { email, password, displayName, dateOfBirth } = this.state;
    const dateError = isDateOfBirthInvalid(dateOfBirth);
    const formButton = action === 'sign-in'
      ? 'Sign in'
      : 'Create Account';
    const registerAccountInputs = action === 'sign-in'
      ? ''
      : <>
        <FloatingInput type="text" name="displayName" placeholder="Display Name" value={displayName} onChange={handleChange} />
        <FloatingInput type="date" name="dateOfBirth" placeholder="Date of Birth" value={dateOfBirth} onChange={handleChange} />
      </>;
    return (
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <FloatingInput type="email" name="email" placeholder="Email Address" value={email} onChange={handleChange}/>
          <FloatingInput type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
          {registerAccountInputs}
          <div className="pl-4 pr-4">
            <button className="w-full bg-blue-500 text-white p-2 rounded text-end">{formButton}</button>
          </div>
        </form>
      </div>
    );
  }
}
