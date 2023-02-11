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
            .findById(req.params.id, )
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json({message: 'Something went wrong while trying to find details of a user', error: err}))
    },
    createUser: (req, res) => {
        User
            .create(req.body)
            .then((newUser) => res.json(newUser))
            .catch((err) =>
                res.status(400).json({message: 'Something went wrong while trying to create', error:err}))
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
    }
};