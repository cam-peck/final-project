import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthForm from '../components/forms/auth-form';
import { server } from '../__mocks__/server';
import { rest } from 'msw';

const { getByLabelText, getByTestId, getByText } = screen;

describe('Tests for auth form component', () => {

  describe('Tests for sign-up form', () => {
    beforeEach(() => render(<AuthForm action='sign-up' />));
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

    test('Updates the value in the email field', async () => {
      const emailInput = getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'timdavis@gmail.com' } });

      expect(emailInput.value).toBe('timdavis@gmail.com');
    });

    test('Updates the value in the password field', async () => {
      const passwordInput = getByLabelText(/password/i);
      fireEvent.change(passwordInput, { target: { value: 'password1' } });

      expect(passwordInput.value).toBe('password1');

    });

    test('Updates the value in the display name field', async () => {
      const displayNameInput = getByLabelText(/Display Name/i);
      fireEvent.change(displayNameInput, { target: { value: 'Tim Davis' } });

      expect(displayNameInput.value).toBe('Tim Davis');

    });

    test('Updates the value in the date field', async () => {
      const birthdayInput = getByTestId('signup-datepicker').firstChild.firstChild.firstChild;
      fireEvent.change(birthdayInput, { target: { value: '09/10/1991' } });

      expect(birthdayInput.value).toBe('09/10/1991');
    });

    test('Able to successfully submit form data', async () => {
      server.use(
        rest.post('/api/auth/sign-up', (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.set('Content-type', 'application/json'),
            ctx.json([{ test: 'test' }])
          );
        })
      );
      const emailInput = getByLabelText(/email/i);
      const passwordInput = getByLabelText(/password/i);
      const displayNameInput = getByLabelText(/Display Name/i);
      const birthdayInput = getByTestId('signup-datepicker').firstChild.firstChild.firstChild;
      const submitButton = getByText(/create account/i);

      fireEvent.change(emailInput, { target: { value: 'timrocks@gmail.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password1' } });
      fireEvent.change(displayNameInput, { target: { value: 'Tim Davis' } });
      fireEvent.change(birthdayInput, { target: { value: '09/10/1991' } });
      fireEvent.submit(submitButton);

      expect(emailInput.value).toBe('');

    });

    //  test('Throws an error when email is invalid', async () => {

    // });
  });

  describe('Tests for sign-in form', () => {
    beforeEach(() => render(<AuthForm />));
    test('Renders the appropriate inputs for sign-in', async () => {
      const emailInput = getByLabelText(/email/i);
      const passwordInput = getByLabelText(/password/i);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    // test('Renders the error message for an incorrect email and/or password', async () => {

    // });

    // test('Able to sign into the test account', async () => {

    // });

    // test('Able to sign into an existing account', async () => {

    // });

  });
});
