exports.AuthMiddleware = async (req, res, next) => {
    try {
        const AuthHeader = req.headers.authorization;

        if(!AuthHeader || !AuthHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const token = AuthHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_Token);
    
        req.user = decodedToken;

        next();
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}