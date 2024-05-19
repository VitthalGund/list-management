import Queue from 'bull';
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

const emailQueue = new Queue('emailQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});

emailQueue.process(async (job) => {
    const { email, subject, body } = job.data;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: body,
    };

    await transporter.sendMail(mailOptions);
});

export default emailQueue;
