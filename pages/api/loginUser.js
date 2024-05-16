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

  if (PARKER_LOGIN || COLLIN_LOGIN) {
    const token = "Logged In User";

    // res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly`);

    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
}
