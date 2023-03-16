import { rest } from 'msw';
export const handlers = [
  rest.post('/api/auth/sign-up', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json([
        {
          userId: 1,
          displayName: 'Cam',
          profilePhoto: 'example.png',
          email: 'camrocks@gmail.com',
          dateOfBirth: '2023-09-01T00:00:00.000Z'
        }
      ])
    );
  }),
  rest.post('/api/auth/sign-in', async (req, res, ctx) => {
    const result = await req.json();
    const { email, password } = result;
    const correctEmail = 'welldone@youdidit.com';
    const correctPassword = 'topsecretpassword';
    const testAccountEmail = 'cameronpeckruns@gmail.com';
    const testAccountPassword = 'password1';
    if ((email === correctEmail && password === correctPassword) || (email === testAccountEmail && password === testAccountPassword)) {
      return res(
        ctx.status(200),
        ctx.json(
          {
            token: 'nicejob!',
            user: { id: 1, payload: 'alltheuserdata' }
          }
        )
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json(
          {
            result: 'user not authorized'
          }
        )
      );
    }
  }),
  rest.get('/api/runs', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-type', 'application/json'),
      ctx.json([
        {
          entryId: 1,
          title: 'Super exciting test run',
          description: 'not the realest run',
          date: '2023-09-01T00:00:00.000Z',
          duration: '00:40:30',
          distance: 4.88,
          distanceUnits: 'kilometers',
          hasGpx: false
        },
        {
          entryId: 2,
          title: 'Test run -- the sequel!',
          description: 'a more realistic run',
          date: '2023-09-08T00:00:00.000Z',
          duration: '00:40:30',
          distance: 4.88,
          distanceUnits: 'miles',
          hasGpx: true
        }
      ])
    );
  }),
  rest.get('/api/runs/gpxData', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-type', 'application/json'),
      ctx.json(
        {
          2: [
            { lat: '39.7684', lon: '86.1581' },
            { lat: '39.7687', lon: '86.1582' }
          ]
        }
      )
    );
  }),
  rest.get('/api/profile', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-type', 'application/json'),
      ctx.json(
        {
          displayName: 'Cam',
          email: 'bestestemailever@gmail.com',
          dateOfBirth: '1991-09-08T00:00:00.000Z',
          weeklyRestDay: 'Wednesday'
        }
      )
    );
  })
];
