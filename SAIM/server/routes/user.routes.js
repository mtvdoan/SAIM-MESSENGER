const UserController = require('../controllers/user.controllers');
module.exports = (app) => {
    app.get('/api/users/', UserController.findAllUsers);
    app.get('/api/users/:id/', UserController.findOneUser);
    app.post('/api/users/', UserController.createUser);
    app.put('/api/users/:id', UserController.updateUser);
    app.delete('/api/users/:id', UserController.deleteUser);
};