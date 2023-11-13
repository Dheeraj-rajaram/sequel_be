import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE,
    auth:{
        user: process.env.MAILER_AUTH_USER,
        pass: process.env.MAILER_AUTH_USER_PASSWORD
    }
});