import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "lockedandloaded99@gmail.com",
        pass: "jtbwoovgyhfchojj"
    }
})

let details = {
    from: "no-reply<lockedandloaded99@gmail.com>",
    to: "dheeraj.br2@gmail.com",
    subject: "testing",
    text: "testing email"
}

transporter.sendMail(details, (error)=> {
    if(error){
        console.log(error)
    }
    else {console.log("email sent")}
})