// import bodyParser from "body-parser";
// import express from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import cors from 'cors';
// dotenv.config()

// const app = express();

// app.use(cors({
//     origin: "*"
// }))

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// let users = [];

// app.post('/signup', async (req, res) => {
//     try {
//         const password = await bcrypt.hash(req.body.password, 10);
//         const user = { name: req.body.name, password };
//         users.push(user);
//         res.status(201).send("user data sent")
//     } catch (error) {
//         res.status(500).send()
//     }
// })


// let refreshTokens = [];

// app.delete('/logout', (req, res) => {
//     refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
//     return res.sendStatus(204)
// })

// app.post('/refresh-token', (req, res) => {
//     const refreshToken = req.body.token;
//     if(refreshToken == null) {
//         return res.sendStatus(401)
//     }
//     if(!refreshTokens.includes(refreshToken)){
//         return res.sendStatus(403)
//     }
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
//         if(error){
//             return res.sendStatus(403)
//         }
//         let accessToken = generateAccessToken({name: user.name, password: user.password});
//         res.json(accessToken)
//     })
// })

// app.post('/login', async (req, res) => {
//     const user = users.find(user => user.name === req.body.name);
//     console.log(user, req.body)
//     if (!user) {
//         return res.status(400).send("cannot find user");
//     }
//     try{
//         if(await bcrypt.compare(req.body.password, user.password)){
//             //jwt
//             let accessToken = generateAccessToken(user);
//             let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
//             refreshTokens.push(refreshToken);
//             res.json({accessToken, refreshToken});
//         }else {
//             res.status(500).send("user authentication failed");
//         }
//     }catch(error){
//         console.log(error)
//         res.status(500).send("something went wrong")
//     }
// })

// function generateAccessToken(user) {
//    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '25s'});
// }


// app.listen(3002);