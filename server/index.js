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

app.use(express.json({ limit: '10mb' }));

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
      if (hasGpx === true) {
        const { gpxPath, gpxRunRecordedTime } = req.body;
        if (!gpxPath || !gpxRunRecordedTime) {
          throw new ClientError(400, 'gpxPath and gpxRunRecordedTime are required fields.');
        }
        const entryId = newRun.entryId;
        const gpxResponse = [];
        for (let i = 0; i < gpxPath.length; i++) {
          const sql = `
          INSERT INTO "gpxData" ("userId", "entryId", "latitude", "longitude", "elevation", "time", "recordedAt")
               VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
          `;
          const params = [userId, entryId, gpxPath[i].lat, gpxPath[i].lng, gpxPath[i].elevation, gpxPath[i].time, gpxRunRecordedTime];
          db.query(sql, params)
            .then(result => {
              const [data] = result.rows;
              gpxResponse.push(data);
            })
            .catch(err => next(err));
        }
      }
      res.status(201).json(newRun);
    })
    .catch(err => next(err));
});

app.get('/api/runs', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
   SELECT "title", "description", "date", "duration", "distance", "distanceUnits", "entryId", "hasGpx"
     FROM "runs"
    WHERE "userId" = $1
 ORDER BY "date" DESC
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const data = result.rows;
      res.json(data);
    })
    .catch(err => next(err));
});

app.get('/api/runs/gpxData', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  SELECT "entryId", "latitude", "longitude", "elevation", "time"
    FROM "gpxData"
   WHERE "userId" = $1
ORDER BY "time";
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const gpxData = result.rows;
      const gpxObj = {};
      for (let i = 0; i < gpxData.length; i++) {
        const currentObj = {};
        currentObj.lat = parseFloat(gpxData[i].latitude);
        currentObj.lng = parseFloat(gpxData[i].longitude);
        if (!gpxObj[gpxData[i].entryId]) {
          gpxObj[gpxData[i].entryId] = [];
        }
        gpxObj[gpxData[i].entryId].push(currentObj);
      }
      res.json(gpxObj);
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
      const [data] = result.rows;
      if (!data) {
        res.status(404).json(`Error: Your id: ${entryId}, does not exist.`);
      } else {
        res.json(data);
      }
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
      if (!editedRun) {
        res.status(404).json(`Error: Your id: ${entryId}, does not exist.`);
      } else {
        res.json(editedRun);
      }
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
     FROM "gpxData"
    WHERE "userId" = $1 AND "entryId" IN ($2);
  `;
  const params = [userId, entryId];
  db.query(sql, params)
    .then(result => {
      const sql2 = `
       DELETE
         FROM "runs"
        WHERE "userId" = $1 AND "entryId" = $2
    RETURNING *;
      `;
      db.query(sql2, params)
        .then(result => {
          const [deletedRow] = result.rows;
          if (!deletedRow) {
            res.status(404).json(`Error: Your id: ${entryId}, does not exist.`);
          } else {
            res.json(deletedRow);
          }
        })
        .catch(err => next(err));
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
  }
  if (workoutDistance === '') {
    workoutDistance = 0;
  }
  if (cooldownDistance === '') {
    cooldownDistance = 0;
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

app.get('/api/workouts', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  SELECT "date", "description", "warmupDistance", "warmupDistanceUnits", "warmupNotes", "workoutDistance", "workoutDistanceUnits", "workoutNotes", "cooldownDistance", "cooldownDistanceUnits", "cooldownNotes", "workoutId"
    FROM "workouts"
   WHERE "userId" = $1
ORDER BY "date" DESC;
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const workouts = result.rows;
      res.json(workouts);
    })
    .catch(err => next(err));
});

app.get('/api/workouts/:workoutId', (req, res, next) => {
  const { userId } = req.user;
  const { workoutId } = req.params;
  if (!workoutId) {
    throw new ClientError(400, 'workoutId is a required paramter as /api/workouts/<parameter-id-here>');
  }
  const sql = `
  SELECT "date", "description", "warmupDistance", "warmupDistanceUnits", "warmupNotes", "workoutDistance", "workoutDistanceUnits", "workoutNotes", "cooldownDistance", "cooldownDistanceUnits", "cooldownNotes"
    FROM "workouts"
   WHERE "userId" = $1 AND "workoutId" = $2;
  `;
  const params = [userId, workoutId];
  db.query(sql, params)
    .then(result => {
      const [data] = result.rows;
      if (!data) {
        res.status(404).json(`Error: Your id: ${workoutId}, does not exist.`);
      } else {
        res.json(data);
      }
    })
    .catch(err => next(err));
});

app.put('/api/workouts/:workoutId', (req, res, next) => {
  const { userId } = req.user;
  const { workoutId } = req.params;
  if (!workoutId) {
    throw new ClientError(400, 'workoutId is a required paramter as /api/workouts/<parameter-id-here>');
  }
  const { date, description, warmupDistanceUnits, workoutDistanceUnits, cooldownDistanceUnits } = req.body;
  let { warmupDistance, warmupNotes, workoutDistance, workoutNotes, cooldownDistance, cooldownNotes } = req.body;
  if (warmupDistance === '') {
    warmupDistance = 0;
  }
  if (workoutDistance === '') {
    workoutDistance = 0;
  }
  if (cooldownDistance === '') {
    cooldownDistance = 0;
  }
  if (!date | !description) {
    throw new ClientError(400, 'date and description are required fields.');
  }
  const sql = `
   UPDATE "workouts"
      SET "date"                  = $1,
          "description"           = $2,
          "warmupDistance"        = $3,
          "warmupDistanceUnits"   = $4,
          "warmupNotes"           = $5,
          "workoutDistance"       = $6,
          "workoutDistanceUnits"  = $7,
          "workoutNotes"          = $8,
          "cooldownDistance"      = $9,
          "cooldownDistanceUnits" = $10,
          "cooldownNotes"         = $11
    WHERE "workoutId" = $12 AND "userId" = $13
RETURNING *
  `;
  const params = [date, description, warmupDistance, warmupDistanceUnits, warmupNotes, workoutDistance, workoutDistanceUnits, workoutNotes, cooldownDistance, cooldownDistanceUnits, cooldownNotes, workoutId, userId];
  db.query(sql, params)
    .then(result => {
      const [editedWorkout] = result.rows;
      if (!editedWorkout) {
        res.status(404).json(`Error: Your id: ${workoutId}, does not exist.`);
      } else {
        res.json(editedWorkout);
      }
    })
    .catch(err => next(err));
});

app.delete('/api/workouts/:workoutId', (req, res, next) => {
  const { userId } = req.user;
  const { workoutId } = req.params;
  if (!workoutId) {
    throw new ClientError(400, 'workoutId is a required paramter as /api/workouts/<parameter-id-here>');
  }
  const sql = `
   DELETE
     FROM "workouts"
    WHERE "userId" = $1 AND "workoutId" = $2
RETURNING *;
  `;
  const params = [userId, workoutId];
  db.query(sql, params)
    .then(result => {
      const [deletedWorkout] = result.rows;
      if (!deletedWorkout) {
        res.status(404).json(`Error: Your id: ${workoutId}, does not exist.`);
      } else {
        res.json(deletedWorkout);
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
