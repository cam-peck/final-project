const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  try {
    const accessToken = req.get('X-Access-Token');
    const payload = jwt.verify(accessToken, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    throw new ClientError(401, 'authentication required');
  }
}

module.exports = authorizationMiddleware;
