const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

async function auth(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }

        const decoded = await jwt.verify(token, JWT_SECRET);
        req.id = decoded.id;
        return next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
}

module.exports = auth;
