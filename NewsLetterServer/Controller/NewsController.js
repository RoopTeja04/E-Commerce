const NewsService = require("../Services/NewsService");

exports.CreateNewsLetter = async(req, res) => {
    try{
        const { email } = req.body;
        if(!email){
            return res.status(400).json({
                message: "Email is required"
            })
        }
        const result = await NewsService.CreateNewsLetter(email);
        return res.status(200).json({
            message: "NewsLetter created successfully",
            data: result
        })

    }catch(err){
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err.message
        })
    }
}

exports.SendBulkNewsletters = async(req, res) => {
    try {
        const { subject, htmlContent } = req.body;
        
        if (!subject || !htmlContent) {
            return res.status(400).json({
                message: "Subject and htmlContent are required fields"
            });
        }
        
        const result = await NewsService.SendBulkNewsletters(subject, htmlContent);
        
        return res.status(200).json({
            message: "Newsletters processed successfully",
            data: result
        });
    } catch(err) {
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: err.message
        });
    }
}