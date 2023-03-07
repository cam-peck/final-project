import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../client/app';

test('renders the landing page page', async () => {
  render(
    <App />
  );

  expect(screen.getAllByRole('button')).toHaveLength(3);
});
