import { db } from '../data/connection';
import config from '../config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const loginController = {
  post(req, res) {
    const { password, username } = req.body;
    if (!password) {
      !username ? res.json({message: "All fields required"}) : res.json({message: "Password is required"})
      return null;
    } else if(!username) {
      res.json({message: "Username is required"});
      return null;
    }
    db.query('SELECT * FROM users WHERE username = ?', username)
    .then((result) => {
      if (bcrypt.compareSync(password, result.results[0].phash)) {
        let token = jwt.sign({username: username, id: result.results[0].id}, config.secret);
        res.status(200).json({status: 'ok', token: token})
      } else {
        res.status(400).json({message: 'Username or password is incorrect'});
      }
    })
    .catch(error => res.status(500).json({message: "Internal server error"}));
  },
}
