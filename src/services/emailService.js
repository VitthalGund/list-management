import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendEmail({ email, subject, body }) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: body,
    };

    return transporter.sendMail(mailOptions);
}
