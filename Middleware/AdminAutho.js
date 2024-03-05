const jwt = require("jsonwebtoken");
const user = require('../models/User');

const SECRET_KEY = "MUTESI";

const isSecure = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(404).send("You're unauthorized");
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return res.status(404).send("You're unauthorized");
        }
        const decodedToken = jwt.verify(token, SECRET_KEY);

        console.log(decodedToken)
        const userId = decodedToken.userInfo.id;

        const userRole = await user.findById(userId);
        console.log(userRole);
        if (!userRole) {
            return res.status(404).send("User not found");
        }
        if (userRole.role == 'admin') {
            req.admin = decodedToken;
            next();
        } else {
            return res.status(403).send("You're not an admin");
        }
    } catch (error) {
        console.error(`Error during authorization: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = isSecure;
