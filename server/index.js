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

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

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
      RETURNING "userId", "displayName", "profilePhoto", "email", "dateOfBirth", "createdAt"
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
   WHERE "email" = $1
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
