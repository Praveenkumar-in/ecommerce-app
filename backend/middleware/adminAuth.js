import jwt from "jsonwebtoken";

// Middleware to verify admin JWT token
const adminAuth = async (req, res, next) => {
  try {
    // Check for Bearer token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access denied" });
    }

    // Attach decoded user info to request
    req.admin = decoded;

    // Continue to next middleware / controller
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuth;
