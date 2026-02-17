const nodeMailer = require("nodemailer");

exports.SendMail = async (to, subject, text) => {
    try{
        const TransPort = nodeMailer.createTransport({
            host : process.env.EMAIL_HOST,
            port : process.env.EMAIL_PORT,
            secure: false, 
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS,
            },
        })

        await TransPort.sendMail({
            from : process.env.EMAIL_USER,
            to : to,
            subject : subject,
            html : text,
        })
    }
    catch(err){
        console.error("Email sending failed:", err);
    }
}