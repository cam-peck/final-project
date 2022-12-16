require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(express.json());

// Auth Routes //

app.post('/api/auth/sign-up', (req, res, next) => {
  const { displayName, profilePhoto, email, dateOfBirth, password } = req.body;
  if (!displayName || !profilePhoto || !email || !dateOfBirth || !password) {
    throw new ClientError(400, 'displayName, profilePhoto, email, dateOfBirth, and password are required fields.');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      INSERT INTO "users" ("displayName", "profilePhoto", "email", "dateOfBirth", "password")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING "userId", "displayName", "profilePhoto", "email", "dateOfBirth", "createdAt";
      `;
      const params = [displayName, profilePhoto, email, dateOfBirth, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
  SELECT "userId",
         "password"
    FROM "users"
   WHERE "email" = $1;
  `;
  const params = [email];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId } = user;
      return argon2
        .verify(user.password, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, email };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

// CRUD Runs Routes //

app.post('/api/runs', (req, res, next) => {
  const { userId } = req.user;
  const { title, description, date, durationHours, durationMinutes, durationSeconds, distance, distanceUnits, hasGpx } = req.body;
  if (!title || !description || !date || !durationHours || !durationMinutes || !durationSeconds || !distance || !distanceUnits) {
    throw new ClientError(400, 'title, description, date, durationHours, durationMinutes, durationSeconds, distance, and distanceUnits are required fields.');
  }
  const duration = `${durationHours}:${durationMinutes}:${durationSeconds}`;
  const sql = `
  INSERT INTO "runs" ("userId", "title", "description", "date", "duration", "distance", "distanceUnits", "hasGpx")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `;
  const params = [userId, title, description, date, duration, distance, distanceUnits, hasGpx];
  db.query(sql, params)
    .then(result => {
      const [newRun] = result.rows;
      res.status(201).json(newRun);
    })
    .catch(err => next(err));
});

app.get('/api/runs', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  SELECT "title", "description", "date", "duration", "distance", "distanceUnits", "entryId"
    FROM "runs"
   WHERE "userId" = $1
ORDER BY "date" DESC;
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const data = result.rows;
      res.json(data);
    })
    .catch(err => next(err));
});

app.get('/api/runs/:entryId', (req, res, next) => {
  const { userId } = req.user;
  const { entryId } = req.params;
  if (!entryId) {
    throw new ClientError(400, 'entryId is a required paramter as /api/runs/<parameter-id-here>');
  }
  const sql = `
  SELECT "title", "description", "date", "duration", "distance", "distanceUnits", "hasGpx"
    FROM "runs"
   WHERE "userId" = $1 AND "entryId" = $2;
  `;
  const params = [userId, entryId];
  db.query(sql, params)
    .then(result => {
      const data = result.rows;
      res.json(data);
    })
    .catch(err => next(err));
});

app.put('/api/runs/:entryId', (req, res, next) => {
  const { userId } = req.user;
  const { entryId } = req.params;
  const { title, description, date, durationHours, durationMinutes, durationSeconds, distance, distanceUnits, hasGpx } = req.body;
  if (!title || !description || !date || !durationHours || !durationMinutes || !durationSeconds || !distance || !distanceUnits) {
    throw new ClientError(400, 'title, description, date, durationHours, durationMinutes, durationSeconds, distance, and distanceUnits are required fields.');
  }
  if (!entryId) {
    throw new ClientError(400, 'entryId is a required paramter as /api/runs/<parameter-id-here>');
  }
  const duration = `${durationHours}:${durationMinutes}:${durationSeconds}`;
  const sql = `
  UPDATE "runs"
     SET "title"         = $1,
         "description"   = $2,
         "date"          = $3,
         "duration"      = $4,
         "distance"      = $5,
         "distanceUnits" = $6,
         "hasGpx"        = $7
   WHERE "entryId" = $8 AND "userId" = $9
   RETURNING *;
  `;
  const params = [title, description, date, duration, distance, distanceUnits, hasGpx, entryId, userId];
  db.query(sql, params)
    .then(result => {
      const [editedRun] = result.rows;
      res.json(editedRun);
    })
    .catch(err => next(err));
});

app.delete('/api/runs/:entryId', (req, res, next) => {
  const { userId } = req.user;
  const { entryId } = req.params;
  if (!entryId) {
    throw new ClientError(400, 'entryId is a required paramter as /api/runs/<parameter-id-here>');
  }
  const sql = `
  DELETE
    FROM "runs"
   WHERE "userId" = $1 AND "entryId" = $2
   RETURNING *;
  `;
  const params = [userId, entryId];
  db.query(sql, params)
    .then(result => {
      const deletedRow = result.rows;
      res.json(deletedRow);
    })
    .catch(err => next(err));
});

// Running Tab Routes //

app.get('/api/progress', (req, res, next) => {
  const { userId } = req.user;

  const squaresSql = `
  SELECT "date", "distance", "distanceUnits", "duration"
    FROM "runs"
   WHERE "userId" = $1
  `;
  const params = [userId];
  db.query(squaresSql, params)
    .then(result => {
      const runDates = result.rows;
      res.json({
        runDates
      });
    })
    .catch(err => next(err));
});

app.get('/api/profile', (req, res, next) => {
  const { userId } = req.user;
  const profileSql = `
  SELECT "displayName", "email", "dateOfBirth"
    FROM "users"
   WHERE "userId" = $1;
  `;
  const params = [userId];
  db.query(profileSql, params)
    .then(result => {
      const [profileData] = result.rows;
      res.send(profileData);
    })
    .catch(err => next(err));
});

// CRUD Workout Routes //

app.post('/api/workouts', (req, res, next) => {
  const { userId } = req.user;
  const { date, description, warmupDistanceUnits, workoutDistanceUnits, cooldownDistanceUnits } = req.body;
  let { warmupDistance, warmupNotes, workoutDistance, workoutNotes, cooldownDistance, cooldownNotes } = req.body;
  if (warmupDistance === '') {
    warmupDistance = 0;
    warmupNotes = null;
  }
  if (workoutNotes === '') {
    workoutDistance = 0;
    workoutNotes = null;
  }
  if (cooldownNotes === '') {
    cooldownDistance = 0;
    cooldownNotes = null;
  }
  if (!date | !description) {
    throw new ClientError(400, 'date and description are required fields.');
  }
  const workoutSql = `
  INSERT INTO "workouts" ("userId", "date", "description", "warmupDistance", "warmupDistanceUnits", "warmupNotes", "workoutDistance", "workoutDistanceUnits", "workoutNotes", "cooldownDistance", "cooldownDistanceUnits", "cooldownNotes")
       VALUES ($1, $2, $3, $4, $5, $6 ,$7, $8, $9, $10, $11, $12)
    RETURNING *
  `;
  const params = [userId, date, description, warmupDistance, warmupDistanceUnits, warmupNotes, workoutDistance, workoutDistanceUnits, workoutNotes, cooldownDistance, cooldownDistanceUnits, cooldownNotes];
  db.query(workoutSql, params)
    .then(result => {
      const [newWorkout] = result.rows;
      res.status(201).send(newWorkout);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
