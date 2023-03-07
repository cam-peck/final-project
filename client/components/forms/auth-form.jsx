import React, { useState } from 'react';
import TextInput from '../inputs/text-input';
import DatePicker from 'react-datepicker';
import { subYears } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingSpinner from '../loading-spinner';

export default function AuthForm(props) {
  const { action, onSignIn } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('example.png');
  const [signInWasInvalid, setSignInWasInvalid] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const resetState = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setDateOfBirth('');
    setProfilePhoto('example.png');
    setSignInWasInvalid(false);
    setFetchingData(false);
    setNetworkError(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setFetchingData(true);
    const body = { email, password, displayName, dateOfBirth, profilePhoto };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    try {
      const response = await fetch(`/api/auth/${action}`, req);
      const result = await response.json();
      if (action === 'sign-up') {
        resetState();
        window.location.hash = 'sign-in';
      } else if (result.user && result.token) {
        resetState();
        onSignIn(result);
        window.location.hash = '#home?tab=activities';
      } else {
        setSignInWasInvalid(true);
        setFetchingData(false);
      }
    } catch (err) {
      console.error('There was an error!', err);
      setNetworkError(true);
      setFetchingData(false);
    }
  };

  const oneClickSignIn = async () => {
    setFetchingData(true);
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
    try {
      const response = await fetch('/api/auth/sign-in', req);
      const result = await response.json();
      if (result.user && result.token) {
        resetState();
        onSignIn(result);
        window.location.hash = '#home?tab=activities';
      } else {
        setSignInWasInvalid(true);
        setFetchingData(false);
      }
    } catch (err) {
      console.error('There was an error!', err);
      setNetworkError(true);
      setFetchingData(false);
    }
  };

  const formButton = action === 'sign-up'
    ? 'Create Account'
    : 'Log in';
  const registerAccountInputs = action === 'sign-up'
    ? <>
      <TextInput type="text" name="displayName" placeholder="Display Name" value={displayName} showLabel={false} onChange={event => setDisplayName(event.target.value)} />
      <DatePicker className="w-full rounded-lg px-3 py-3.5 border border-gray-300 focus:outline-blue-500 mb-4" selected={dateOfBirth} onChange={date => setDateOfBirth(date)} dateFormat='MM/dd/yyy' maxDate={subYears(new Date(), 10)} minDate={subYears(new Date(), 100)} placeholderText='Date of Birth' required />
    </>
    : '';
  return (
    <div className="max-w-md mx-auto">
      <form className="pl-4 pr-4 w-full" onSubmit={handleSubmit}>
        <TextInput type="email" name="email" placeholder="Email Address" value={email} showLabel={false} onChange={event => setEmail(event.target.value)}/>
        <TextInput type="password" name="password" placeholder="Password" value={password} showLabel={false} onChange={event => setPassword(event.target.value)} />
        {registerAccountInputs}
        {
          signInWasInvalid
            ? <p className="text-red-500 text-xs italic -mt-1.5 mb-3 ml-2">Invalid username or password</p>
            : ''
        }
        {
          networkError
            ? <p className="text-red-500 text-xs italic -mt-1.5 mb-3 ml-2">There was an error connecting to the network. Please check your internet connection and try again.</p>
            : ''
        }
        <div>
          <button className="w-full bg-blue-500 transition-colors ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold text-lg mb-2">{formButton}</button>
        </div>
        {
            action === 'sign-up'
              ? <p className="font-roboto text-center">Already have an account? <a href="#" className="font-roboto text-blue-500 underline">Sign in</a> </p>
              : <div className="flex gap-2">
                <button type="button" onClick={oneClickSignIn} className="w-1/2 bg-orange-400 transition-colors ease-in-out duration-300 text-white p-3 rounded-lg font-bold text-lg">Try me out!</button>
                <button type="button" onClick={() => { window.location.hash = 'sign-up'; }} className="w-1/2 bg-green-500 transition-colors ease-in-out duration-300 text-white p-3 rounded-lg font-bold text-lg text-center">Register</button>
              </div>
          }
        { fetchingData === true
          ? <LoadingSpinner darkbg={true} />
          : ''
        }
      </form>
    </div>
  );
}
