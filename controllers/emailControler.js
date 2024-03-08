const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler');
const { model } = require('mongoose');


const sendEmail = asyncHandler(async(data,req,res)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.MAIL_ID,
          pass: process.env.MAIL_PASS,
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Hello 👻" <abc@example.com>', // sender address
          to: data.to, // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
          html: data.html, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
      
      main().catch(console.error);


})











module.exports = sendEmail ; 