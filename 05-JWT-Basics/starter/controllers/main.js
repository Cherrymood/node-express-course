import { BadRequestError } from "../errors/index.js";
import jwt from "jsonwebtoken";

async function login(req, res) {
  const { username, password } = req.body;
  console.log({ username, password });

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log(token);

  res.status(200).json({ msg: "user created", token });
}

async function dashboard(req, res) {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username} `,
    secret: `Here is your auth data, your lucky number is ${luckyNumber}`,
  });
}

export { login, dashboard };
