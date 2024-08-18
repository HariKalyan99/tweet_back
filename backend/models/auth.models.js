import mongoose from "mongoose";
import validator from "validator";

const authUserSchema = new mongoose.Schema({
    username: {type: String, maxlength: 100, minlength: 5, unique: true, required: true},
    password: {type: String, required: true, unique: true, match: /^[A-Za-z0-9\s]+$/, minlength: 6},
    email: {type: String, unique: true, required: true, validate: (mail) => validator.isEmail(mail)},
    fullname: {type: String, maxlength: 100, minlength: 5, required: true}
})

const Auth = new mongoose.model('Auth', authUserSchema);

export default Auth;