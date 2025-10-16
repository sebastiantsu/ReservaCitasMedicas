const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // acepta token en header 'auth-token' o en Authorization: Bearer <token>
  const token = req.header('auth-token') || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return res.status(401).send('Acceso denegado');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).send('Token inválido');
  }
}

module.exports = verifyToken;
