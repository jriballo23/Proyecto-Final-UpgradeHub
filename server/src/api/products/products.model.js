const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
        tipo: { type: String, required: true, trim: true },
        marca: { type: String, required: true, trim: true },
        modelo: { type: String, required: true, trim: true },
        fecha: { type: String, required: true, trim: true },
        estado: { type: String, required: true, trim: true },
        precio: { type: String, required: true, trim: true },
        cp: { type: Number, required: true, trim: true },
        img: { type: String, trim: true, required: false }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('products', productSchema);
module.exports = Product;