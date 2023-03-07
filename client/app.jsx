import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Home from './pages/home';
import Auth from './pages/auth';
import Runs from './pages/runs';
import Workouts from './pages/workouts';
import NotFound from './pages/not-found';
import Navbar from './components/navbar/navbar';
import { AppContext, parseRoute } from './lib';

export default function App(props) {
  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [route, setRoute] = useState(parseRoute(window.location.hash));

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const hashRoute = parseRoute(window.location.hash);
      setRoute(hashRoute);
    });
    const token = window.localStorage.getItem('runningfuze-project-jwt');
    const user = token ? jwtDecode(token) : null;
    setUser(user);
    setIsAuthorizing(false);
  }, []);

  const handleSignIn = result => {
    const { user, token } = result;
    window.localStorage.setItem('runningfuze-project-jwt', token);
    setUser(user);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem('runningfuze-project-jwt');
    setUser(null);
  };

  const renderPage = () => {
    const { path } = route;
    if (path === '' || path === 'sign-up') {
      return <Auth />;
    }
    if (path === 'home' || (path === '#' && user)) {
      const homeId = route.params.get('tab');
      const validIds = ['progress', 'activities', 'profile'];
      if (!validIds.includes(homeId)) return <NotFound />;
      return <Home tab={homeId}/>;
    }
    if (path === 'run-form') {
      const mode = route.params.get('mode');
      if (mode === 'edit') {
        const editId = route.params.get('entryId');
        return <Runs mode='edit' entryId={editId} />;
      } else return <Runs mode='add' />;
    }
    if (path === 'workout-form' || path === 'workouts') {
      const mode = route.params.get('mode');
      if (mode === 'edit') {
        const editId = route.params.get('workoutId');
        return <Workouts mode='edit' workoutId={editId} />;
      } else return <Workouts mode='add' />;
    }
    return <NotFound />;
  };

  if (isAuthorizing) return null;
  const contextValue = { user, route, handleSignIn, handleSignOut };

  return (
    <AppContext.Provider value={contextValue}>
      <Navbar />
      { renderPage() }
    </AppContext.Provider>
  );
}
