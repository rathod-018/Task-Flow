import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"


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
        avatar: {
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

userShema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userShema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


export const User = mongoose.models("User", userShema)