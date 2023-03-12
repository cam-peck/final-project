import { rest } from 'msw';
export const handlers = [
  rest.post('/api/auth/sign-up', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.set('Content-Type', 'application/json'),
      ctx.json([
        {
          userId: 1,
          displayName: 'Tim Davis',
          profilePhoto: 'example.png',
          email: 'timrocks@gmail.com',
          dateOfBirth: '09/10/1991'
        }
      ])
    );
  })
];
