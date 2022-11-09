require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');

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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
