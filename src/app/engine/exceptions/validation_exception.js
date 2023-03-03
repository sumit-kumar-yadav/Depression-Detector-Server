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
