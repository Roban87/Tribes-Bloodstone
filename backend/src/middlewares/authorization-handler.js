import jwt from 'jsonwebtoken';
import config from '../config';

export default (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw { message: 'No token provided' };
    }
    const token = req.headers.authorization.match(/(?<=Bearer\s).*/)[0];
    const decoded = jwt.verify(token, config.secret, { algorithms: ['HS256'] });
    req.user = decoded;

    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      err.message = 'Invalid token';
    }
    err.status = 401;
    next(err);
  }
};
