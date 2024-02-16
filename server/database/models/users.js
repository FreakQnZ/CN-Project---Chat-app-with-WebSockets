import mongoose, { mongo } from "mongoose";

const user = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

mongoose.models = {}
export const User = mongoose.model('user', user)