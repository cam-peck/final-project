import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContext } from '../lib';
import App from '../app';
import { BrowserRouter } from 'react-router-dom';

describe('Tests for auth page component', () => {

  const handleSignIn = jest.fn();
  const handleSignOut = jest.fn();
  const route = { path: 'sign-in' };
  const user = null;

  const context = { handleSignIn, handleSignOut, route, user };

  test('renders the sign-in page if the user has not signed-in', async () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={context}>
          <App />
        </AppContext.Provider>
      </BrowserRouter>

    );

    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  test('renders the sign-up page when register is clicked', async () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={context}>
          <App />
        </AppContext.Provider>
      </BrowserRouter>
    );

    const registerButton = screen.getByText('Register');
    fireEvent.click(registerButton);
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  test('redirects the user to their home page if they\'ve already signed in', async () => {

  });

});
