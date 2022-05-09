const TechnewRoutes = require('express').Router();
const { isAuth } = require("../../middlewares/auth.middleware");
const upload = require('../../middlewares/updateFile.middleware');

const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./technews.controller');

TechnewRoutes.get('/', getAll);
TechnewRoutes.get('/:id', getOne);
TechnewRoutes.post('/', [isAuth], upload.single('img'), postOne);
TechnewRoutes.patch('/:id', [isAuth], upload.single('img'), patchOne);
TechnewRoutes.delete('/:id', [isAuth], deleteOne);

module.exports = TechnewRoutes;