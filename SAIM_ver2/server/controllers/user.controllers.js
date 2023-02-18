const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function helper(message, value) {
    console.log(message, value);
    return value;
}

module.exports = {
    findAllUsers: (req, res) => {
        User.find()
            .then((allUsers) =>
                res.json({ allUsers, message: "Here are all users" })
            )
            .catch((err) =>
                res.status(400).json({
                    message:
                        "Something went wrong while trying to view all users",
                    error: err,
                })
            );
    },

    updateUser: (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedAwayMessage) =>
                res.json({
                    updatedAwayMessage,
                    message: "You have successfully updated a user profile.",
                })
            )
            .catch((err) =>
                res
                    .status(400)
                    .json({
                        message: "Something went wrong while user update.",
                        error: err,
                    })
            );
    },
    findOneUser: (req, res) => {
        User.findById(req.params.id)
            .then((user) =>
                res.json({
                    user,
                    message: "Yay you have found a specific user",
                })
            )
            .catch((err) =>
                res.status(400).json({
                    message:
                        "Something went wrong while trying to find details of a user",
                    error: err,
                })
            );
    },

    register: (req, res) => {
        User.create(req.body)
            .then((user) => {
                const userToken = jwt.sign(
                    {
                        id: user._id,
                    },
                    process.env.SECRET_KEY
                );

                res.cookie("usertoken", userToken, {
                    httpOnly: true,
                }).json({ msg: "Successful Registration!", user: user });
            })
            .catch((err) =>
                res.json({ message: "Problem with registration", error: err })
            );
    },

    deleteUser: (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then((deletedUser) =>
                res.json({ deletedUser, message: "Successfully deleted user." })
            )
            .catch((err) =>
                res.status(400).json({
                    message: "Something went wrong while deleting/adopting.",
                    error: err,
                })
            );
    },
    //CODING DOJO METHOD
    login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if (user === null) {
            // email not found in users collection
            return res
                .sendStatus(400)
                .json({ message: "Invalid email address" });
        }

        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!correctPassword) {
            // password wasn't a match!
            return res.sendStatus(400).json({ message: "Invalid password" });
        }

        // if we made it this far, the password was correct
        const userToken = jwt.sign(
            {
                id: user._id,
            },
            process.env.SECRET_KEY
        );

        console.log(
            "Yay! You have successfully signed in.  Here's your usertoken: ",
            userToken,
            "User's information: ",
            req.body
        );

        // note that the response object allows chained calls to cookie and json
        res.cookie("usertoken", userToken, {
            httpOnly: true,
        }).json({
            msg: "You have successfully logged in.",
            userInfo: {
                id: user._id,
                screenName: user.screenName,
            },
        });
    },

    logout: (req, res) => {
        res.clearCookie("usertoken");
        res.sendStatus(200).json({ message: "You have logged out!" });
    },
};
