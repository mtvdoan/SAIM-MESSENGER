const User = require('../models/user.models');

module.exports = {
    findAllUsers: (req, res) => {
        User
            .find()
            .then((allUsers) => res.json(allUsers))
            .catch((err) => res.status(400).json({message: 'Something went wrong while trying to view all users', error: err}))
    },

    findOneUser: (req, res) => {
        User
            .findById(req.params.id)
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json({message: 'Something went wrong while trying to find details of a user', error: err}))
    },

    updateUser: (req, res) => {
        User
            .findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})
            .then(updatedUser => res.json({updatedUser}))
            .catch((err) => res.status(400).json({message: "Something went wrong while updating.", error:err}))
    },
    
    deleteUser: (req, res) => {
        User
            .findByIdAndDelete(req.params.id)
            .then(deletedUser => res.json({deletedUser}))
            .catch((err) => res.status(400).json({message: "Something went wrong while deleting/adopting.", error:err}));
    },
    register: (req, res) => {
        User
            .create(req.body)
            .then(newUser => {
                const userToken = jwt.sign({
                    id: newUser._id
                }, process.env.SECRET_KEY)
                res
                    .cookie("usertoken", userToken, {httpOnly:true})
                    .json({
                        message: "Successful registration", 
                        user: {
                            id: newUser._id,
                            screenName: User.screenName,

                        //changed this from username = User.username
                        }
                        })
            })
            .catch((err) =>{
                res.status(400).json({message: "Problem with rjfdhakjshkjafhegistration", error: err})
            })
    },
    login: async (req, res) => {
        const user = await User.findOne({
            email: req.body.email
            
        })
        if (user === null) {
            return res.status(400).json({message: "Invalid login"})
        }
        // console.log(user)

        // CONGRATULATIONS YOU FOUND THE USER IN THE DATABASE
        const correctPassword = await bcrypt.compare(req.body.password, user.password)

        if (!correctPassword) {
            return res.status(400).json({message: "Invalid login"})
        }

        const userToken = jwt.sign({
            id: user._id,
        }, process.env.SECRET_KEY);

        console.log(userToken);
    
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!", userInfo: {
                id: user._id,
                username: user.username
            } });


    },
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },
};