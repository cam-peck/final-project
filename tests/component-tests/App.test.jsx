import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContext } from '../../client/lib';
import Auth from '../../client/pages/auth';

const handleSignIn = jest.fn();
const handleSignOut = jest.fn();
const route = { path: 'sign-in' };
const user = null;

const context = { handleSignIn, handleSignOut, route, user };

test('renders the landing page', async () => {
  render(
    <AppContext.Provider value={context}>
      <Auth />
    </AppContext.Provider>
  );

  expect(screen.getAllByRole('button')).toHaveLength(3);
});
