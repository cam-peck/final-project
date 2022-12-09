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
      fetchingData: false,
      networkError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.oneClickSignIn = this.oneClickSignIn.bind(this);
  }

  resetState() {
    this.setState({
      email: '',
      password: '',
      displayName: '',
      dateOfBirth: '',
      profilePhoto: 'example.png',
      signInWasInvalid: false,
      fetchingData: false,
      networkError: false
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
        })
        .catch(error => {
          console.error('There was an error!', error);
          this.setState({
            networkError: true,
            fetchingData: false
          });
        });
    });

  }

  oneClickSignIn() {
    this.setState({ fetchingData: true }, () => {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'cameronpeckruns@gmail.com',
          password: 'password1'
        })
      };
      fetch('/api/auth/sign-in', req)
        .then(response => response.json())
        .then(result => {
          if (result.user && result.token) {
            this.resetState();
            this.props.onSignIn(result);
            window.location.hash = '#home?tab=activities';
          } else {
            this.setState({ signInWasInvalid: true, fetchingData: false });
          }
        })
        .catch(error => {
          console.error('There was an error!', error);
          this.setState({
            networkError: true,
            fetchingData: false
          });
        });
    });
  }

  render() {
    const { action } = this.props; // either sign-in or sign-out
    const { handleChange, handleSubmit, handleDateChange, oneClickSignIn } = this;
    const { email, password, displayName, dateOfBirth, signInWasInvalid, fetchingData, networkError } = this.state;
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
      ? <p className="text-red-500 text-xs italic -mt-1.5 mb-3 ml-2">Invalid username or password</p>
      : '';
    const networkErrorMsg = networkError
      ? <p className="text-red-500 text-xs italic -mt-1.5 mb-3 ml-2">There was an error connecting to the network. Please check your internet connection and try again.</p>
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
          {networkErrorMsg}
          <div>
            <button className="w-full bg-blue-500 transition-colors ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold text-lg mb-2">{formButton}</button>
          </div>
          {
            action === 'sign-in'
              ? <div className="flex gap-2">
                <button type="button" onClick={oneClickSignIn} className="w-1/2 bg-orange-400 transition-colors ease-in-out duration-300 text-white p-3 rounded-lg font-bold text-lg">Try me out!</button>
                <a className="w-1/2 bg-green-500 transition-colors ease-in-out duration-300 text-white p-3 rounded-lg font-bold text-lg text-center" href="#sign-up" >Register</a>
              </div>
              : <p className="font-roboto text-center">Already have an account? <a href="#sign-in" className="font-roboto text-blue-500 underline">Sign in</a> </p>
          }
          {dataLoadingSpinner}
        </form>
      </div>
    );
  }
}
