import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../app';
import { BrowserRouter } from 'react-router-dom';

const { getAllByRole } = screen;

describe('Tests for landing page', () => {
  render(
    <App />, { wrapper: BrowserRouter }
  );

  test('renders the sign-in page when no user is signed in', async () => {
    expect(getAllByRole('heading')).toHaveLength(2);
    expect(getAllByRole('button')).toHaveLength(3);
  });

  // test('renders the home page when a user is signed in', async () => {

  // });
});
