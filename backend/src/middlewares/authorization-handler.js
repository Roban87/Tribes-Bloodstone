import jwt from 'jsonwebtoken';
import config from '../config';

export default async (req, res, next) => {
  const token = req.headers.authorization.match(/.*(?=Bearer\s)/);
  try {
    if (!token) {
      throw {message: "No token provided"}
    }
    const decoded = jwt.verify(token, config.secret,{algorithms: ["HS256"]});
    req.user = decoded;
    next(); 
  } catch(err) {
      if (err.name === 'JsonWebTokenError') {
        err.message = 'Invalid token';
      }
      err.status = 401;
      next(err);
  }
}