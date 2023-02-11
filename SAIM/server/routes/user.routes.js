const UserController = require('../controllers/user.controllers');
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/users/', UserController.findAllUsers);
    app.get('/api/users/:id/', UserController.findOneUser);
    // app.post('/api/users/', UserController.createUser);
    app.put('/api/users/:id', UserController.updateUser);
    app.delete('/api/users/:id', UserController.deleteUser);
    

    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.get("/api/users/logout", UserController.logout)
};