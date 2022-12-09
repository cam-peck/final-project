import React from 'react';
import AuthForm from '../components/forms/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {

    const { route, handleSignIn } = this.context;

    const welcomeMessage = route.path === 'sign-in'
      ? 'Sign in'
      : 'Register';
    return (
      <div className="w-11/12 md:w-8/12 max-w-lg mx-auto bg-white pb-10 rounded-lg border border-gray-200 shadow-lg mt-8 mb-8 sm:mt-14">
        <h1 className="font-lora font-medium text-3xl text-center pt-10 mb-6">{welcomeMessage}</h1>
        <AuthForm action={route.path} onSignIn={handleSignIn}/>
      </div>
    );
  }
}
AuthPage.contextType = AppContext;
