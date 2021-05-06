const nodemailer = require('nodemailer');
const config = require('../Database/config.json');

const sendMail = (context,email) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dbsdatingappcbs@gmail.com',
            pass: 'Vin2021vin'
        }
    });
    
    let mailOptions = {
        from: 'dbsdatingappcbs@gmail.com',
        to: email,
        subject: 'Forgot your password?',
        text: '',
        html: '<body><h1>Click on the button to reset your password</h1><a style="font: bold 11px Arial;text-decoration: none;background-color: #EEEEEE;color: #333333;padding: 2px 6px 2px 6px;border-top: 1px solid #CCCCCC;border-right: 1px solid #333333;border-bottom: 1px solid #333333;border-left: 1px solid #CCCCCC;"href="http://localhost:3000/newpassword">Reset password</a></body>'
    };
    
    transporter.sendMail(mailOptions,function(error,info){
        if (error){
            context.log(error);
        } else {
            context.log('Email sent:' + info.response);
        }
        context.done();
    });
    //context.done comes too early, it doesn't get the context logs...need to place it somewhere else?
    
}
function forgotPassword (context, req) {
    
    try {
    context.log('JavaScript HTTP trigger function processed a request.');
    const email = (req.query.email || (req.body && req.body.email));

    sendMail(context,email)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = forgotPassword;
