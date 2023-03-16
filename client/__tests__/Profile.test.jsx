import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../components/runs/profile';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../lib';

describe('<Profile />', () => {
  const user = { id: 1, name: 'Cam' };
  const context = { user };

  test('Should have a loading spinner present while data is retrieved', () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={context}>
          <Profile />
        </AppContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('Should load the current user\'s profile', async () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={context}>
          <Profile />
        </AppContext.Provider>
      </BrowserRouter>
    );

    await waitForElementToBeRemoved(screen.getByTestId('loading-spinner'));
    const title = screen.getByRole('heading', { name: 'My Profile' });
    const email = screen.getByText('bestestemailever@gmail.com');
    const displayName = screen.getByText('Cam');
    const birthDate = screen.getByText('September 8th, 1991');
    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(displayName).toBeInTheDocument();
    expect(birthDate).toBeInTheDocument();

  });

});
