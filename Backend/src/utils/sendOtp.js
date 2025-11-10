import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
})

const sendOtp = async (email, otp) => {
    const mailOption = {
        from: {
            name: "Task Flow",
            address: process.env.EMAIL
        },
        to: email,
        subject: `Your Code - ${otp}`,
        html: `<p>Your OTP is ${otp} </p>`
    }

    try {
        const result = await transporter.sendMail(mailOption)
        console.log("Mail sent successfully")
        console.log("Message Id:", result.messageId)
        return true
    } catch (error) {
        console.log("ERROR!!", error.message)
        return false
    }


}

export { sendOtp }