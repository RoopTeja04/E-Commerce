const NewsRepo = require("../Repository/NewsRepository");
const { SendEmail } = require("../Utils/EmailService");

async function CreateNewsLetter(email) {
    try{

        const findEmail  = await NewsRepo.FindEmail(email)

        if(findEmail){
            throw new Error("You are already subscribed to the newsletter");
        }

        const result = await NewsRepo.CreateNewsLetter(email);

        const subject = "Welcome to Our Newsletter!";
        const htmlContent = `
            <h2>Thank you for subscribing!</h2>
            <p>You have successfully opted into our newsletter with the email <b>${email}</b>.</p>
            <p>Stay tuned for amazing updates.</p>
        `;
        
        await SendEmail(email, subject, htmlContent);

        return result;
    }catch(err){
        throw err;
    }
}

async function SendBulkNewsletters(subject, htmlContent) {
    try {
        const subscribers = await NewsRepo.GetAllEmails();
        
        if (!subscribers || subscribers.length === 0) {
            throw new Error("No subscribers found");
        }

        const emails = subscribers.map(sub => sub.email);
        
        // Send email to each subscriber individually
        const sendPromises = emails.map(email => SendEmail(email, subject, htmlContent));
        await Promise.allSettled(sendPromises);

        return {
            success: true,
            totalSent: emails.length
        };
    } catch(err) {
        throw err;
    }
}

module.exports = {
    CreateNewsLetter,
    SendBulkNewsletters
}