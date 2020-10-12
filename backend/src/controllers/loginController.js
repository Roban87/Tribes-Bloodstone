import db from '../data/connection';

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
    res.status(200).json({username: username, password: password});
  }
}
