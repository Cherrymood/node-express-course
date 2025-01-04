import jwt from "jsonwebtoken";

async function logon(req, res) {
  const { name, password } = req.body;

  console.log(name, password);

  if (!name || !password) {
    throw new Error("Please provide a username and password");
  }

  const id = new Date().getDate();

  // Generate JWT token
  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.status(200).json({ msg: "User created", token });
}

async function hello(req, res) {
  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: "Here is your auth data.",
  });
}

export { logon, hello };
