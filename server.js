import bodyParser from "body-parser";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from 'cors';
import { sequelusers } from "./models/sequelusers.js";
import { v4 as uuidv4 } from 'uuid';
import { transporter } from "./email.js";

dotenv.config()

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/signup', async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const user = { email: req.body.email, password };
        const result = sequelusers.create({
            id: uuidv4(),
            email: req.body.email,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            dob: req.body.dob,
            phonenumber: req.body.phonenumber,
            password: password,
        });

        res.status(201).send({ message: "user data sent", result, user })
    } catch (error) {
        res.status(500).send()
    }
})

app.post('/login', async (req, res) => {
    const user = await sequelusers.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) {
        return res.status(400).send("cannot find user");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            let accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
            res.json({ accessToken });
        } else {
            res.status(500).send("user authentication failed");
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong")
    }
})

app.post('/verify', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.send({ isAuth: false, message: "no token found" })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.send({ isAuth: false, message: "token verification failed" })
        }
        return res.send({ isAuth: true, message: "jwt valid" })
    });
})

app.post('/forgot-password', async (req, res) => {
    const user = await sequelusers.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) {
        return res.status(400).send("cannot find user");
    }
    const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET);
    const details = {
        from: "no-reply<lockedandloaded99@gmail.com>",
        to: req.body.email,
        subject: "reset password",
        text: `Reset your password with this link ${process.env.BASE_URL}/reset-password?token=${token}`
    }
    transporter.sendMail(details, (error) => {
        if (error) {
            console.log(error)
        }
        else { console.log("email sent") }
    })
    return res.json({ email: req.body.email })
})

app.post('/reset-password', async (req, res) => {
    // decrypt token
    const decodedToken = jwt.decode(req.body.token, {
        complete: true
       });
    // check if email is present in db
    const user = await sequelusers.findOne({
        where: {
            email: decodedToken.payload.email
        }
    });
    if (!user) {
        return res.status(400).send("cannot find user");
    }
    // encrypt password
    const newPassword = await bcrypt.hash(req.body.password, 10);
    // update password for the email
    await sequelusers.update({ password: newPassword }, {
        where: {
            email: decodedToken.payload.email
        }
      });
})

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.sendStatus(403)
        }
        req.user = user;
        next();
    });
}

app.listen(3002)