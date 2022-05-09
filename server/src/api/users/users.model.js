const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { validationPassword, validationEmail } = require('../../utils/validators/validators');

const userSchema = new mongoose.Schema(
    {
        fullname:{ type: String, trim: true, required: false },
        birthday:{ type: String, trim: true, required: false },
        nickname:{ type: String, trim: true, required: false },
        cp:{ type: String, trim: true, required: false },
        email: { type: String, trim: true, required: false },
        password: { type: String, trim: true, required: false},
        favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "products", trim: true }],
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products", trim: true }]
    }
);

userSchema.pre("save", function (next) {
    if (!validationPassword(this.password)) {
        return next(new Error());
    }
    if (!validationEmail(this.email)) {
         return next(new Error());
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('users', userSchema);
module.exports = User;