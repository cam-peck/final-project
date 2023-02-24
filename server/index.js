require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const errorMiddleware = require('./error-middleware');
const timeout = require('connect-timeout');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(timeout('15s'));

app.use(staticMiddleware);

app.use(express.json({ limit: '10mb' }));

// Auth Routes //

app.post('/api/auth/sign-up', async (req, res, next) => {
  const { displayName, profilePhoto, email, dateOfBirth, password } = req.body;
  if (!displayName || !profilePhoto || !email || !dateOfBirth || !password) {
    throw new ClientError(400, 'displayName, profilePhoto, email, dateOfBirth, and password are required fields.');
  }
  try {
    const hashedPassword = await argon2.hash(password);
    const sql = `
      INSERT INTO "users" ("displayName", "profilePhoto", "email", "dateOfBirth", "password")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING "userId", "displayName", "profilePhoto", "email", "dateOfBirth", "createdAt";
      `;
    const params = [displayName, profilePhoto, email, dateOfBirth, hashedPassword];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
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
  try {
    // Query the db for the password and user //
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) throw new ClientError(401, 'Invalid login.');
    const { userId } = user;
    // Verify the user's password //
    const isMatching = await argon2.verify(user.password, password);
    if (!isMatching) throw new ClientError(401, 'Invalid login.');
    const payload = { userId, email };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.use(authorizationMiddleware);

// CRUD Runs Routes //

app.post('/api/runs', async (req, res, next) => {
  const { userId } = req.user;
  const { title, description, date, durationHours, durationMinutes, durationSeconds, distance, distanceUnits, hasGpx } = req.body;
  if (!title || !description || !date || !durationHours || !durationMinutes || !durationSeconds || !distance || !distanceUnits) {
    throw new ClientError(400, 'title, description, date, durationHours, durationMinutes, durationSeconds, distance, and distanceUnits are required fields.');
  }
  const duration = `${durationHours}:${durationMinutes}:${durationSeconds}`;
  const insertRunSql = `
  INSERT INTO "runs" ("userId", "title", "description", "date", "duration", "distance", "distanceUnits", "hasGpx")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `;
  const insertGpxSql = `
  INSERT INTO "gpxData" ("userId", "entryId", "latitude", "longitude", "elevation", "time")
       VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const insertRunParams = [userId, title, description, date, duration, distance, distanceUnits, hasGpx];
  try {
    const result = await db.query(insertRunSql, insertRunParams);
    const [newRun] = result.rows;
    if (hasGpx === true) {
      const { gpxPath } = req.body;
      if (!gpxPath) throw new ClientError(400, 'gpxPath is a required field.');
      const entryId = newRun.entryId;
      for (let i = 0; i < gpxPath.length; i++) {
        const insertGpxParams = [userId, entryId, gpxPath[i].lat, gpxPath[i].lng, gpxPath[i].elevation, gpxPath[i].time];
        const gpxResult = await db.query(insertGpxSql, insertGpxParams);
        if (!gpxResult) throw new ClientError(404).json('Error: GPS data is invalid.');
      }
    }
    res.status(201).send(newRun);
  } catch (err) {
    next(err);
  }
});

app.get('/api/runs', async (req, res, next) => {
  const { userId } = req.user;
  const sql = `
   SELECT "title", "description", "date", "duration", "distance", "distanceUnits", "entryId", "hasGpx"
     FROM "runs"
    WHERE "userId" = $1
 ORDER BY "date" DESC
  `;
  const params = [userId];
  try {
    const result = await db.query(sql, params);
    const data = result.rows;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.get('/api/runs/gpxData', async (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  SELECT "entryId", "latitude", "longitude", "elevation", "time"
    FROM "gpxData"
   WHERE "userId" = $1
ORDER BY "time";
  `;
  const params = [userId];
  try {
    const result = await db.query(sql, params);
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
  } catch (err) {
    next(err);
  }

});

app.get('/api/runs/:entryId', async (req, res, next) => {
  const { userId } = req.user;
  const { entryId } = req.params;
  if (!entryId) {
    throw new ClientError(400, 'entryId is a required paramter as /api/runs/<parameter-id-here>');
  }
  const getRunSql = `
  SELECT "title", "description", "date", "duration", "distance", "distanceUnits", "hasGpx"
    FROM "runs"
   WHERE "userId" = $1 AND "entryId" = $2;
  `;
  const getGpxSql = `
  SELECT "latitude", "longitude", "elevation", "time"
    FROM "gpxData"
   WHERE "userId" = $1 AND "entryId" = $2
ORDER BY "time";
  `;
  const params = [userId, entryId];
  // Grab run-data first //
  const runResult = await db.query(getRunSql, params);
  const [runData] = runResult.rows;
  if (!runData) {
    res.status(404).json(`Error: Your id: ${entryId}, does not exist.`);
    return;
  }
  // Grab gpx-data if it exists next //
  const gpxData = [];
  if (runData.hasGpx) {
    const gpxResult = await db.query(getGpxSql, params);
    const stringGpxData = gpxResult.rows;
    for (let i = 0; i < stringGpxData.length; i++) {
      const currentPoint = {};
      currentPoint.lat = parseFloat(stringGpxData[i].latitude);
      currentPoint.lng = parseFloat(stringGpxData[i].longitude);
      currentPoint.elevation = stringGpxData[i].elevation;
      currentPoint.time = stringGpxData[i].time;
      gpxData.push(currentPoint);
    }
  }
  res.json({ runData, gpxData });
});

app.put('/api/runs/:entryId', async (req, res, next) => {
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
  const updateRunSql = `
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
  const insertNewGpxSql = `
  INSERT INTO "gpxData" ("userId", "entryId", "latitude", "longitude", "elevation", "time")
       VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const deleteGpxSql = `
  DELETE
    FROM "gpxData"
   WHERE "userId" = $1 AND "entryId" IN ($2);
  `;
  const updateRunParams = [title, description, date, duration, distance, distanceUnits, hasGpx, entryId, userId];
  const deleteGpxParams = [userId, entryId];

  try {
    const result = await db.query(updateRunSql, updateRunParams);
    const [editedRun] = result.rows;
    if (!editedRun) {
      res.status(404).json(`Error: Your id: ${entryId}, does not exist.`);
      return;
    }
    // old GPS data needs to be deleted before we add new GPS data //
    if (editedRun.hasGpx) {
      await db.query(deleteGpxSql, deleteGpxParams);
      // currently, the only possible scenario is adding new GPS data //
      const { gpxPath } = req.body;
      for (let i = 0; i < gpxPath.length; i++) {
        const insertNewGpxParams = [userId, entryId, gpxPath[i].lat, gpxPath[i].lng, gpxPath[i].elevation, gpxPath[i].time];
        const gpxPointResult = await db.query(insertNewGpxSql, insertNewGpxParams);
        if (!gpxPointResult) throw new ClientError(404).json('Error: GPS data is invalid.');
      }
    }
    res.json(editedRun);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/runs/:entryId', async (req, res, next) => {
  const { userId } = req.user;
  const { entryId } = req.params;
  if (!entryId) {
    throw new ClientError(400, 'entryId is a required paramter as /api/runs/<parameter-id-here>');
  }
  const deleteGpxSql = `
   DELETE
     FROM "gpxData"
    WHERE "userId" = $1 AND "entryId" IN ($2);
  `;
  const deleteRunSql = `
   DELETE
     FROM "runs"
    WHERE "userId" = $1 AND "entryId" = $2
RETURNING *;
  `;
  const params = [userId, entryId];
  try {
    await db.query(deleteGpxSql, params);
    const result = await db.query(deleteRunSql, params);
    const [deletedRow] = result.rows;
    if (!deletedRow) {
      res.status(404).json(`Error: Your id: ${entryId}, does not exist.`);
    } else {
      res.json(deletedRow);
    }
  } catch (err) {
    next(err);
  }
});

// Running Tab Routes //

app.get('/api/progress', async (req, res, next) => {
  const { userId } = req.user;

  const squaresSql = `
  SELECT "date", "distance", "distanceUnits", "duration"
    FROM "runs"
   WHERE "userId" = $1
  `;
  const restDaysSql = `
  SELECT "date", "isCustom", "isWeeklyDay"
  FROM "restDays"
  WHERE "userId" = $1
  ORDER BY "date" DESC
  `;
  const params = [userId];
  try {
    const squaresSqlResult = await db.query(squaresSql, params);
    const restDaysSqlResult = await db.query(restDaysSql, params);
    const runDates = squaresSqlResult.rows;
    const restDates = restDaysSqlResult.rows;
    res.json({ runDates, restDates });
  } catch (err) {
    next(err);
  }
});

app.post('/api/restDays', async (req, res, next) => {
  const { userId } = req.user;
  const { newRestDays } = req.body;
  if (!newRestDays) {
    throw new ClientError(400, 'newRestDays is a required field.');
  }
  const restDaySql = `
  INSERT INTO "restDays" ("userId", "date", "isCustom", "isWeeklyDay")
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `;
  for (let i = 0; i < newRestDays.length; i++) {
    const { date, isCustom, isWeeklyDay } = newRestDays[i];
    const params = [userId, date, isCustom, isWeeklyDay];
    try {
      const restDaySqlResult = await db.query(restDaySql, params);
      res.json(restDaySqlResult);
    } catch (err) {
      next(err);
    }
  }
});

app.get('/api/restDays', async (req, res, next) => {
  const { userId } = req.user;
  const restDaySql = `
  SELECT "date", "isCustom", "isWeeklyDay"
  FROM "restDays"
  WHERE "userId" = $1
  `;
  const params = [userId];
  try {
    const restDaySqlResult = await db.query(restDaySql, params);
    res.json(restDaySqlResult.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/profile', async (req, res, next) => {
  const { userId } = req.user;
  const profileSql = `
  SELECT "displayName", "email", "dateOfBirth"
    FROM "users"
   WHERE "userId" = $1;
  `;
  const params = [userId];
  try {
    const result = await db.query(profileSql, params);
    const [profileData] = result.rows;
    res.send(profileData);
  } catch (err) {
    next(err);
  }
});

app.put('/api/profile/weeklyRestDay', async (req, res, next) => {
  const { userId } = req.user;
  const { weeklyRestDay } = req.body;
  if (!weeklyRestDay) {
    throw new ClientError(400, 'weeklyRestDay is a required field');
  }
  const weeklyRestDaySql = `
     UPDATE "users"
        SET "weeklyRestDay" = $2
      WHERE "userId" = $1
  RETURNING "displayName", "weeklyRestDay";
  `;
  const params = [userId, weeklyRestDay];
  try {
    const result = await db.query(weeklyRestDaySql, params);
    const restDayData = result.rows;
    res.send(restDayData);
  } catch (err) {
    next(err);
  }
});

// CRUD Workout Routes //

app.post('/api/workouts', async (req, res, next) => {
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
  try {
    const result = await db.query(workoutSql, params);
    const [newWorkout] = result.rows;
    res.status(201).send(newWorkout);
  } catch (err) {
    next(err);
  }
});

app.get('/api/workouts', async (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  SELECT "date", "description", "warmupDistance", "warmupDistanceUnits", "warmupNotes", "workoutDistance", "workoutDistanceUnits", "workoutNotes", "cooldownDistance", "cooldownDistanceUnits", "cooldownNotes", "workoutId"
    FROM "workouts"
   WHERE "userId" = $1
ORDER BY "date" DESC;
  `;
  const params = [userId];
  try {
    const result = await db.query(sql, params);
    const workouts = result.rows;
    res.json(workouts);
  } catch (err) {
    next(err);
  }
});

app.get('/api/workouts/:workoutId', async (req, res, next) => {
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
  try {
    const result = await db.query(sql, params);
    const [data] = result.rows;
    if (!data) {
      res.status(404).json(`Error: Your id: ${workoutId}, does not exist.`);
    } else {
      res.json(data);
    }
  } catch (err) {
    next(err);
  }
});

app.put('/api/workouts/:workoutId', async (req, res, next) => {
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
  try {
    const result = await db.query(sql, params);
    const [editedWorkout] = result.rows;
    if (!editedWorkout) {
      res.status(404).json(`Error: Your id: ${workoutId}, does not exist.`);
    } else {
      res.json(editedWorkout);
    }
  } catch (err) {
    next(err);
  }
});

app.delete('/api/workouts/:workoutId', async (req, res, next) => {
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
  try {
    const result = await db.query(sql, params);
    const [deletedWorkout] = result.rows;
    if (!deletedWorkout) {
      res.status(404).json(`Error: Your id: ${workoutId}, does not exist.`);
    } else {
      res.json(deletedWorkout);
    }
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
