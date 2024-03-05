const user = require('../models/User');
const userAuth = require("../Middleware/userAuth")
const nodemailer = require('nodemailer');
// function to show the list of users
const index = (req, res, next) => {
    user.find()
        .then(users => {
            res.json({
                users: users
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while fetching users'
            });
        });
};

{ /**sending email*/ }
async function sendEmail(email) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            // Use true for port 465, false for all other ports
            auth: {
                user: "shema.talks@gmail.com",
                pass: "frgfsrebfmplivfw",
            },
        });

        const mailOptions = {
            from: {
                name: 'hope Tesy',
                address: 'shema.talks@gmail.com',
            },
            to: email,
            subject: 'Subject of the email',
            text: 'your account has been created successfully',
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
// function to show the details of a single admin by using admin ID
const show = (req, res, next) => {
    let userId = req.params.userID;
    user.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'user not found'
                });
            }
            res.json({
                user: user
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while fetching user details'
            });
        });
};

// function to add a user to the database
const store = (req, res, next) => {
    let users = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    users.save()
        .then(savedUser => {
            res.status(201).json({
                message: 'User added successfully',
                admins: savedUser
            });
            if (savedUser) {
                sendEmail(req.body.email); // Send email asynchronously
            }
        })


        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while adding a user'
            });
        });
};
//User login
const userLogin = async (req, res) => {
    try {
        const email = req.body.email
        const userLogin = await user.findOne({ email: email });

        if (!userLogin) return res.status(401).send(`Incorrect username or password`);
        let userInfo = {

            id: userLogin._id,

        };
        return userAuth(userInfo, res)


    } catch (error) {
        console.log(error);
        res.send(`500 Server Error : `, error);
    }
};
// function to update a user in the database using user ID
const update = (req, res, next) => {
    let userID = req.params.userID;
    let updatedData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    user.findByIdAndUpdate(userID, {
        $set: updatedData
    }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({
                    message: 'user not found'
                });
            }
            res.json({
                message: 'User updated successfully',
                user: updatedUser
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while updating a user'
            });
        });
};

// function to delete an employee from the database using user ID
const destroy = (req, res, next) => {
    let userID = req.params.userID;
    user.findOneAndDelete(userID)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            res.json({
                message: 'User deleted successfully'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred while deleting user'
            });
        });
};

module.exports = { index, show, store, update, destroy, userLogin };
