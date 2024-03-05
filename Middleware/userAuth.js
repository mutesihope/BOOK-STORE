const jwt = require("jsonwebtoken")
const SECRET_KEY = "MUTESI"
const userAuth = (userInfo, res) => {
    jwt.sign(
        { userInfo },
        SECRET_KEY,
        { expiresIn: "20m" },   
        (err, token) => {
            if (err) return console.error(err);
            res.status(200).json({
                message: "Logged in successfully",
                token: token,
            });
        }
    )
};

module.exports = userAuth;