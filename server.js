import bodyParser from "body-parser";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from 'cors';
import { sequelusers } from "./models/sequelusers.js";
import { v4 as uuidv4 } from 'uuid';

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

app.get('/users', authenticate, (req, res) => {
    // return res.json({ step:"step3: get token from header in be", users, heredata: req.user, otherdata: 234 })
    return res.json({ mike })
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
            //jwt
            let accessToken = generateAccessToken({ email: user.email });
            let refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken);
            res.json({ accessToken, refreshToken });
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


let refreshTokens = [];

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    return res.sendStatus(204)
})

app.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) {
        return res.sendStatus(401)
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403)
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.sendStatus(403)
        }
        let accessToken = generateAccessToken({ name: user.name, password: user.password });
        res.json(accessToken)
    })
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

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
}

app.listen(3002)