const jwt = require("jsonwebtoken");

const SECRET_KEY = "MUTESI";

const studentSecure = async (req, res, next) => {
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
        if (decodedToken.role == 'student') {

            console.log(req.student);
            req.student = decodedToken;
            next();
        }

        return console.log("you're not a student")
    } catch (error) {
        console.error(`Error during authorization: ${error}`);
        res.status(400).json({ error });
    }
};

module.exports = studentSecure;
