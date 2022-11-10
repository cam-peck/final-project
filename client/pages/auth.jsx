import React from 'react';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {

    const { route, handleSignIn } = this.context;

    const welcomeMessage = route.path === 'sign-in'
      ? 'Sign in'
      : 'Register';
    const signInMessage = route.path === 'sign-in'
      ? 'Don\'t have an account?'
      : 'Not your first time here?';
    const alternateAction = route.path === 'sign-in'
      ? <a href='#sign-up'>Sign up</a>
      : <a href='#sign-in'>Sign in</a>;
    return (
      <div>
        <h1 className="font-lora font-medium text-3xl text-center mt-20">{welcomeMessage}</h1>
        <AuthForm action={route.path} onSignIn={handleSignIn}/>
        <div className="flex justify-center items-center mt-3">
          <p className="font-roboto pr-1">{signInMessage}</p>
          <p className="font-roboto text-blue-500 underline">{alternateAction}</p>
        </div>
      </div>
    );
  }
}
AuthPage.contextType = AppContext;
