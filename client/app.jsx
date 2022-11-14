import React from 'react';
import jwtDecode from 'jwt-decode';
import Home from './pages/home';
import Auth from './pages/auth';
import Runs from './pages/runs';
import NotFound from './pages/not-found';
import Navbar from './components/navbar';
import { AppContext, parseRoute } from './lib';

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
    const token = window.localStorage.getItem('runningfuze-project-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('runningfuze-project-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('runningfuze-project-jwt');
    this.setState({ user: null });
    window.location.hash = 'sign-in';
  }

  renderPage() {
    const { path } = this.state.route;
    const { route } = this.state;
    if (path === 'home' || '') {
      const tab = route.params.get('tab');
      return <Home tab={tab}/>;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }
    if (path === 'add-run' || path === 'edit-run') {
      return <Runs />;
    }
    return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Navbar />
          { this.renderPage() }
        </>
      </AppContext.Provider>
    );
  }
}
