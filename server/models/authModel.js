import mongoose from "mongoose";

const Auth = new mongoose.Schema({
    name_surname: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    created_at: {
        type: Date,
        default: new Date()

    }
});

export default mongoose.model("users", Auth);