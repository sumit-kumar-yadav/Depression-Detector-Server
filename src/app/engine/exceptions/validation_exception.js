const { validationResult } = require('express-validator');
const { apiError } = require('../../helpers/format_response');

module.exports.throwValidationError = (req, res, next) => {

    const errorsResult = validationResult.withDefaults({
        formatter: (error) => {
            return {
                value: error.value,
                message: error.msg,
                param: error.param,
                location: error.location,
            };
        }
    });

    const errors = errorsResult(req);

    if (!errors.isEmpty()) {

        return apiError('', res, errors.array(), 422);

    }

    next();
}

module.exports.throwMulterUploadError = (err, req, res, next) => {
    if(err) return apiError(err.message, res, {}, 400);
    else next();

    // Used from 
    // app.use((err, req, res, next) => {
    //     if (err instanceof multer.MulterError) { // Multer-specific errors
    //         return res.status(418).json({
    //             err_code: err.code,
    //             err_message: err.message,
    //         });
    //     } else { // Handling errors for any other cases from whole application
    //         return res.status(500).json({
    //             err_code: 409,
    //             err_message: "Something went wrong!"
    //         });
    //     }
    // });
}
