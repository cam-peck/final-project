import { setupServer } from 'msw/node';
import { handlers } from './handlers';
// configures a mock server with given handlers //

export const server = setupServer(...handlers);
