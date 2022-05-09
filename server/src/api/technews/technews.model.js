const mongoose = require('mongoose');
const technewSchema = new mongoose.Schema(
    {        
        title: { type: String, required: true, trim: true },
        container: { type: String, required: true, trim: true },
        img: { type: String, trim: true, required: false }

    },
    {
        timestamps: true
    }
);

const Technew = mongoose.model('technews', technewSchema);
module.exports = Technew;