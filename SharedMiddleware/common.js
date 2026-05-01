exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || (err.message.includes("Internal") ? 500 : 400);
    
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
