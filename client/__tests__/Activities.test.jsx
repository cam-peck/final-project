import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import Activities from '../components/runs/activities';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../lib';

describe('<Activities />', () => {
  const user = { id: 1, name: 'test-user' };
  const context = { user };

  test('Should have a loading spinner present while data is retrieved', () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={context}>
          <Activities />
        </AppContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('Should load all runs for the test user', async () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={context}>
          <Activities />
        </AppContext.Provider>
      </BrowserRouter>
    );

    await waitForElementToBeRemoved(screen.getByTestId('loading-spinner'));
    const title = screen.getByRole('heading', { name: 'My Activities' });
    const run1 = screen.getByRole('heading', { name: 'September 1st, 2023' });
    const run2 = screen.getByRole('heading', { name: 'September 8th, 2023' });
    expect(title).toBeInTheDocument();
    expect(run1).toBeInTheDocument();
    expect(run2).toBeInTheDocument();

  });

  test('Should load the GPS data for the second test run', async () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={context}>
          <Activities />
        </AppContext.Provider>
      </BrowserRouter>
    );

    await waitForElementToBeRemoved(screen.getByTestId('loading-spinner'));
    const title = screen.getByRole('heading', { name: 'My Activities' });
    const gpsData = screen.getByTitle('run-mini-card-gmaps');
    expect(title).toBeInTheDocument();
    expect(gpsData).toBeInTheDocument();
  });

  test('Should navigate to the upload run page when upload button is clicked', async () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={context}>
          <Activities />
        </AppContext.Provider>
      </BrowserRouter>
    );

    await waitForElementToBeRemoved(screen.getByTestId('loading-spinner'));
    const uploadRunButton = screen.getByRole('link');
    expect(uploadRunButton).toHaveAttribute('href', '/runs/upload');
  });
});
