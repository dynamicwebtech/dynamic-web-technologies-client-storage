/**
 *
 *  This is the loginUser api
 *
 */

export default function handler(req, res) {
  const { username, password } = req.body;

  const PARKER_LOGIN =
    username === process.env.PARKER_LOGIN_USERNAME &&
    password === process.env.PARKER_LOGIN_PASSWORD;

  const COLLIN_LOGIN =
    username === process.env.COLLIN_LOGIN_USERNAME &&
    password === process.env.COLLIN_LOGIN_PASSWORD;

  let token;
  let message;

  if (PARKER_LOGIN) {
    token = "Parker";
    message = "Login successful";
  } else if (COLLIN_LOGIN) {
    token = "Collin";
    message = "Login successful";
  }

  if (token) {
    res.status(200).json({ message, token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
}
