import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import RunForm from '../components/forms/run-form';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../lib';

const { getByLabelText, getByText, getByRole, getAllByRole, getByTestId } = screen;

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

const ContextAndBrowserRouter = ({ children }) => {
  const user = { id: 1, token: 'suchtokenverysecure' };
  const context = { user };

  return (
    <BrowserRouter>
      <AppContext.Provider value={context}>
        {children}
      </AppContext.Provider>
    </BrowserRouter>
  );
};

describe('Tests for auth form component', () => {

  describe('Tests for create run form', () => {

    beforeEach(() => render(<RunForm mode='add' />, { wrapper: ContextAndBrowserRouter }));

    test('Renders the appropriate inputs', async () => {

      const dateInput = getByText(/date/i); // not labeltext because imported date-picker component
      const distanceUnitInput = getByText(/miles/i);
      const durationAndDistanceInputs = getAllByRole('spinbutton');
      const durationDropdown = getAllByRole('option');
      const paceData = getByLabelText(/pace/i);
      const titleInput = getByLabelText(/title/i);
      const descriptionInput = getByLabelText(/description/i);

      expect(dateInput).toBeInTheDocument();
      expect(distanceUnitInput).toBeInTheDocument();
      expect(durationAndDistanceInputs).toHaveLength(4);
      expect(durationDropdown).toHaveLength(4);
      expect(paceData).toBeInTheDocument();
      expect(titleInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
    });

    test('Able to successfully submit form data without GPS data', async () => {

      const distanceInput = getByTestId('runs-distance-input');
      const distanceUnitInput = getByText(/miles/i);
      const durationHours = getByTestId('runs-hours-input');
      const durationMinutes = getByTestId('runs-minutes-input');
      const durationSeconds = getByTestId('runs-seconds-input');
      const titleInput = getByLabelText(/title/i);
      const descriptionInput = getByLabelText(/description/i);
      const submitButton = getByRole('button');

      fireEvent.change(distanceInput, { target: { value: 8.22 } });
      fireEvent.change(distanceUnitInput, { target: { value: 'kilometers' } });
      fireEvent.change(durationHours, { target: { value: 0 } });
      fireEvent.change(durationMinutes, { target: { value: 42 } });
      fireEvent.change(durationSeconds, { target: { value: 17 } });
      fireEvent.change(titleInput, { target: { value: 'Super Cool Test Run' } });
      fireEvent.change(descriptionInput, { target: { value: 'The realest run you\'ve ever seen' } });
      fireEvent.click(submitButton);
      await waitForElementToBeRemoved(getByTestId('loading-spinner'));

      expect(mockedUseNavigate).toHaveBeenCalledWith('/home/activities');

    });

  });
});
