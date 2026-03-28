const NewsService = require("../Services/NewsService");

exports.CreateNewsLetter = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        }
        const result = await NewsService.CreateNewsLetter(email);
        return res.status(200).json({
            message: "NewsLetter created successfully",
            data: result
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}