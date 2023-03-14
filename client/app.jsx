import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Home from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Runs from './pages/runs';
// import Workouts from './pages/workouts';
// import NotFound from './pages/not-found';
import Navbar from './components/navbar/navbar';
import { AppContext } from './lib';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function App(props) {
  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
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
    navigate('/');
  };

  if (isAuthorizing) return null;
  const contextValue = { user, handleSignIn, handleSignOut };

  return (
    <AppContext.Provider value={contextValue}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home">
          <Route path="activities" element={<Home tab="activities" />} />
          <Route path="progress" element={<Home tab="progress" />} />
          <Route path="profile" element={<Home tab="profile" />} />\
        </Route>
        <Route path="/runs">
          <Route path="upload" element={<Runs mode="add" />} />
          <Route path=":entryId" element={<Runs mode="edit" />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}
