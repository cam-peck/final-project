import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import Auth from './pages/auth';
import NotFound from './pages/not-found';
import { AppContext, parseRoute } from './lib';
import { Container } from '@mui/material';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const hashRoute = parseRoute(window.location.hash);
      this.setState({ route: hashRoute });
    });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('runningfuze-project-jwt', token);
    this.setState({ user, isAuthorizing: false });
  }

  handleSignOut() {

  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }
    return <NotFound />;
  }

  render() {
    const { route } = this.state;
    const contextValue = { route };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Navbar />
          <Container maxWidth="lg">
            { this.renderPage() }
          </Container>
        </>
      </AppContext.Provider>
    );
  }
}
