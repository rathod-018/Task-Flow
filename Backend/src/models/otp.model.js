import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        otp: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Date,
            default: () => Date.now() + 5 * 60 * 1000,
            index: { expires: 0 }
        }
    }, { timestamps: true })



export const OtpModel = mongoose.model("Otp", otpSchema)