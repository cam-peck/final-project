import { rest } from 'msw';
export const handlers = [
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
  })
];
