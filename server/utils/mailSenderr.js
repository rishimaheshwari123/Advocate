const nodemailer = require("nodemailer")

const mailSender = async (email, title, body, files) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            secure: false,
        })

        let info = await transporter.sendMail({
            from: `"S.D Taxation Associate " <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
            attachments: files
        })
        return info
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

module.exports = mailSender
