import mongoose, { Schema } from "mongoose";


const userShema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
        },
        password: {
            type: String,
            required: true,
        },
        avator: {
            url: { type: String },
            public_id: { type: String }
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    })


export const User = mongoose.models("User", userShema)