import mongoose from "mongoose";
import validator from "validator";

const authUserSchema = new mongoose.Schema({
    username: {type: String, maxlength: 100, unique: true, required: true},
    password: {type: String, required: true, unique: true, minlength: 6},
    email: {type: String, unique: true, required: true, validate: (mail) => validator.isEmail(mail)},
    fullname: {type: String, maxlength: 100, required: true}
}, {timestamps: true})

const Auth = new mongoose.model('Auth', authUserSchema);

export default Auth;