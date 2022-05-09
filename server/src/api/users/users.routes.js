const UserRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const { register, login, logout, getUser, patchUser, getAll } = require('./users.controller');
const upload = require('../../middlewares/updateFile.middleware');

UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
UserRoutes.post('/logout', [isAuth], logout);
UserRoutes.get('/:id', getUser);
UserRoutes.patch('/:id', [isAuth], upload.single('img'), patchUser);
UserRoutes.get('/', getAll);

module.exports = UserRoutes;