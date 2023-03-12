import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContext } from '../lib';
import Auth from '../pages/auth';

describe('Tests for auth page component', () => {

  const handleSignIn = jest.fn();
  const handleSignOut = jest.fn();
  const route = { path: 'sign-in' };
  const user = null;

  const context = { handleSignIn, handleSignOut, route, user };

  test('renders the sign-in page if the user has not signed-in', async () => {
    render(
      <AppContext.Provider value={context}>
        <Auth />
      </AppContext.Provider>
    );

    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  test('renders the sign-up page when the path changes', async () => {
    context.route = { path: 'sign-up' };
    render(
      <AppContext.Provider value={context}>
        <Auth />
      </AppContext.Provider>
    );

    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  test('redirects the user to their home page if they\'ve already signed in', async () => {

  });

});
