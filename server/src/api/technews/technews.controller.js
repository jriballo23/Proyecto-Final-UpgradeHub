const Technew = require('./technews.model');
const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');


const getAll = async (req, res, next) => {
    try {
        const technews = await Technew.find();
        res.status(200).json(technews);
    } catch (error) {
        return next(error)
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const technew = await Technew.findById(id);
        res.status(200).json(technew);
    } catch (error) {
        return next(error)
    }
}

const postOne = async (req, res, next) => {
    try {
        const technew = new Technew();
        technew.title = req.body.title;
        technew.container = req.body.container;
        if (req.file) technew.img = req.file.path
        const technewDB = await technew.save();
        return res.status(201).json(technewDB)
    } catch (error) {
        return next(error)
    }
}

const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const technew = new Technew();
        technew.title = req.body.title;
        technew.container = req.body.container;
        if (req.file) technew.img = req.file.path
        technew._id = id;
        const updateTechnew = await Technew.findByIdAndUpdate(id, technew);
        return res.status(200).json(updateTechnew);
    } catch (error) {
        return next(error);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const technew = await Technew.findByIdAndDelete(id);
        if (technew.img) deleteImgCloudinary(technew.img)
        return res.status(200).json(technew);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}