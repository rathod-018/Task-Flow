import { OtpModel } from "../models/otp.model.js";

const otpGenerator = async (email) => {
    if (!email) {
        return null
    }

    let otp = ""
    for (let i = 0; i < 5; i++) {
        otp += Math.floor(Math.random() * 10)
    }

    const otpExist = await OtpModel.findOne({ email })

    if (otpExist) {
        await OtpModel.deleteOne({ email })
    }

    await OtpModel.create({
        email,
        otp,
        expiredAt: Date.now() + 5 * 60 * 1000
    })

    return otp;

}

export { otpGenerator }