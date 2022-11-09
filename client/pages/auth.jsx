import React from 'react';
// import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {

    const { route } = this.context;

    // const welcomeMessage = route.path === 'sign in'
    //   ? 'Sign in'
    //   : 'Register';
    return (
      <h1>Hello Auth Page!</h1>
    );
  }
}
AuthPage.contextType = AppContext;
