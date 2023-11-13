import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "ragavdheeraj@gmail.com",
        pass: "lgohmkbzbjkntptn"
    }
});