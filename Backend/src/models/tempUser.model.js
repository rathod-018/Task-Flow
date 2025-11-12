import mongoose, { Schema } from "mongoose";


const tempUserShema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
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
        avatar: {
            url: { type: String },
            public_id: { type: String }
        }
    },
    {
        timestamps: true
    })




export const TempUser = mongoose.model("TempUser", tempUserShema)