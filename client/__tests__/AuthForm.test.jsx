import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthForm from '../components/forms/auth-form';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../lib';

const { getByLabelText, getByTestId, getByText } = screen;

describe('Tests for auth form component', () => {

  describe('Tests for sign-up form', () => {

    beforeEach(() => render(<AuthForm action='sign-up' />, { wrapper: BrowserRouter }));

    test('Renders the appropriate inputs', async () => {

      const emailInput = getByLabelText(/email/i);
      const passwordInput = getByLabelText(/password/i);
      const displayNameInput = getByLabelText(/Display Name/i);
      const birthdayInput = getByTestId('signup-datepicker').firstChild.firstChild.firstChild;

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(displayNameInput).toBeInTheDocument();
      expect(birthdayInput).toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    test('Able to successfully submit form data', async () => {
      const emailInput = getByLabelText(/email/i);
      const passwordInput = getByLabelText(/password/i);
      const displayNameInput = getByLabelText(/Display Name/i);
      const birthdayInput = getByTestId('signup-datepicker').firstChild.firstChild.firstChild.nextSibling;
      const submitButton = getByText(/create account/i);

      fireEvent.change(emailInput, { target: { value: 'timrocks@gmail.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password1' } });
      fireEvent.change(displayNameInput, { target: { value: 'Tim Davis' } });
      fireEvent.change(birthdayInput, { target: { value: '09/10/1991' } });
      fireEvent.submit(submitButton);
      await waitForElementToBeRemoved(screen.getByTestId('loading-spinner'));

      expect(emailInput.value).toBe('');

    });
  });

  describe('Tests for sign-in form', () => {

    const user = null;
    const handleSignIn = jest.fn();
    const context = { handleSignIn, user };

    beforeEach(() => render(
      <BrowserRouter>
        <AppContext.Provider value={context}>
          <AuthForm action="sign-in" handleSignIn={handleSignIn}/>
        </AppContext.Provider>
      </BrowserRouter>
    ));

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Renders the appropriate inputs for sign-in', async () => {
      const emailInput = getByLabelText(/email/i);
      const passwordInput = getByLabelText(/password/i);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    test('Able to sign into an existing account', async () => {
      const emailInput = getByLabelText(/email/i);
      const passwordInput = getByLabelText(/password/i);
      const loginButton = getByText(/log in/i);

      fireEvent.change(emailInput, { target: { value: 'welldone@youdidit.com' } });
      fireEvent.change(passwordInput, { target: { value: 'topsecretpassword' } });
      fireEvent.click(loginButton);
      await waitForElementToBeRemoved(screen.getByTestId('loading-spinner'));
      expect(handleSignIn).toHaveBeenCalled();
    });

    test('Able to sign into a the test account', async () => {
      const tryMeOutButton = getByText(/try me out/i);

      fireEvent.click(tryMeOutButton);
      await waitForElementToBeRemoved(screen.getByTestId('loading-spinner'));
      expect(handleSignIn).toHaveBeenCalled();
    });

    test('Renders the error message for an incorrect email and/or password', async () => {
      const emailInput = getByLabelText(/email/i);
      const passwordInput = getByLabelText(/password/i);
      const loginButton = getByText(/log in/i);

      fireEvent.change(emailInput, { target: { value: 'thefakestemail@email.net' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);
      await waitForElementToBeRemoved(screen.getByTestId('loading-spinner'));
      expect(handleSignIn).not.toHaveBeenCalled();
      const errorText = screen.getByText(/invalid username or password/i);
      expect(errorText).toBeInTheDocument();
    });

  });
});
