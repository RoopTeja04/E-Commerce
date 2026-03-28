const newsLetter = require("../Models/NewsLetter");

async function FindEmail(email){
    try{
        const result = await newsLetter.findOne({ email });
        return result;
    }catch(err){
        throw err;
    }
}

async function CreateNewsLetter(email){
    try{
        const result = await newsLetter.create({ email });
        return result;
    }catch(err){
        throw err;
    }
}

async function GetAllEmails() {
    try {
        const results = await newsLetter.find({}, 'email');
        return results;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    FindEmail,
    CreateNewsLetter,
    GetAllEmails
}