exports.success = (res, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        data,
    });
};

exports.error = (res, code = 500, message = "An error occurred!", data = {}) => {
    return res.status(code).json({
        success: false,
        data,
        error: {
            code,
            message,
        },
    });
};
