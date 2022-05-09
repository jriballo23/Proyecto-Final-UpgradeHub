const Product = require('./products.model');
const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');


const getAll = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        return next(error)
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        return next(error)
    }
}

const postOne = async (req, res, next) => {
    try {
        const product = new Product();
        product.tipo = req.body.tipo;
        product.marca = req.body.marca;
        product.modelo = req.body.modelo;
        product.fecha = req.body.fecha;
        product.estado = req.body.estado;
        product.precio = req.body.precio;
        product.cp = req.body.cp;
        if (req.file) product.img = req.file.path
        const productDB = await product.save();
        return res.status(201).json(productDB)
    } catch (error) {
        return next(error)
    }
}

const patchOne = async (req, res, next) => {
   
    try {
        const { id } = req.params;
        const product = new Product(req.body);
        product._id = id;
        if (req.file) product.img = req.file.path
        const updateProduct = await Product.findByIdAndUpdate(id, product);
        return res.status(200).json(updateProduct);
    } catch (error) {
        return next(error);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (product.img) deleteImgCloudinary(product.img)
        return res.status(200).json(product);
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