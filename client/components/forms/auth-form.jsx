import React from 'react';
import TextInput from '../inputs/text-input';
import DatePicker from 'react-datepicker';
import { subYears } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingSpinner from '../loading-spinner';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      displayName: '',
      dateOfBirth: '',
      profilePhoto: 'example.png',
      signInWasInvalid: false,
      fetchingData: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  resetState() {
    this.setState({
      email: '',
      password: '',
      displayName: '',
      dateOfBirth: '',
      profilePhoto: 'example.png',
      signInWasInvalid: false,
      fetchingData: false
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleDateChange(date) {
    this.setState({
      dateOfBirth: date
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ fetchingData: true }, () => {
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
            this.setState({ signInWasInvalid: true, fetchingData: false });
          }
        });
    });

  }

  render() {
    const { action } = this.props; // either sign-in or sign-out
    const { handleChange, handleSubmit, handleDateChange } = this;
    const { email, password, displayName, dateOfBirth, signInWasInvalid, fetchingData } = this.state;
    const formButton = action === 'sign-in'
      ? 'Log in'
      : 'Create Account';
    const registerAccountInputs = action === 'sign-in'
      ? ''
      : <>
        <TextInput type="text" name="displayName" placeholder="Display Name" value={displayName} showLabel={false} onChange={handleChange} />
        <DatePicker className="w-full rounded-lg px-3 py-3.5 border border-gray-300 focus:outline-blue-500 mb-4" selected={dateOfBirth} onChange={handleDateChange} dateFormat='MM/dd/yyy' maxDate={subYears(new Date(), 10)} minDate={subYears(new Date(), 100)} placeholderText='Date of Birth' required/>
      </>;
    const invalidSignIn = signInWasInvalid
      ? <p className="text-red-500 text-xs italic -mt-2.5 mb-4 ml-6">Invalid username or password</p>
      : '';
    const dataLoadingSpinner = fetchingData === true
      ? <LoadingSpinner darkbg={true} />
      : '';
    return (
      <div className="max-w-md mx-auto">
        <form className="pl-4 pr-4 w-full" onSubmit={handleSubmit}>
          <TextInput type="email" name="email" placeholder="Email Address" value={email} showLabel={false} onChange={handleChange}/>
          <TextInput type="password" name="password" placeholder="Password" value={password} showLabel={false} onChange={handleChange} />
          {registerAccountInputs}
          {invalidSignIn}
          <div>
            <button className="w-full bg-blue-500 transition ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold text-lg">{formButton}</button>
          </div>
          {dataLoadingSpinner}
        </form>
      </div>
    );
  }
}
