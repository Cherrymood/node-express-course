import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, name: decoded.name };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
export default authenticateToken;
