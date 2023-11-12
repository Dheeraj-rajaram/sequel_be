import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "lockedandloaded99@gmail.com",
        pass: "jtbwoovgyhfchojj"
    }
});