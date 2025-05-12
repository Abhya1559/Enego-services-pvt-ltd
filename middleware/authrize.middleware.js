import jwt from "jsonwebtoken";

// Middleware to verify JWT Token
export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;  // Store user info in request object
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

// Middleware for Role-based Authorization
export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
