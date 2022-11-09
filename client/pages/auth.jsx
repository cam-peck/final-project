import React from 'react';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {

    const { route } = this.context;

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
        <h1 className="welcome-message">{welcomeMessage}</h1>
        <AuthForm action={route.path}/>
        <p className="sign-in-message">{signInMessage} {alternateAction}</p>
      </div>
    );
  }
}
AuthPage.contextType = AppContext;
