/* global beforeAll, afterEach, afterAll */
import '@testing-library/jest-dom/extend-expect';
import { server } from './__mocks__/server.js';
import 'whatwg-fetch';

// Establish API mocking before all tests //
beforeAll(() => server.listen());

// Reset request handlers so that they don't affect other tests //
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished //
afterAll(() => server.close());
