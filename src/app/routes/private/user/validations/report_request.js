const { body, param } = require('express-validator');

module.exports.validate = (reqType) => {

    switch (reqType) {

        case 'postReport': {
            return [
                param('appointmentId')
                    .notEmpty().withMessage('Appointment id cannot be empty').bail()
                    .isLength({ min: 10, max: 50 }).withMessage(`Invalid Appointment id`),
                body('description')
                    .notEmpty().withMessage('Please enter the report description').bail()
                    .isLength({ min: 10, max: 500 }).withMessage(`Invalid description`),
                body('suggestion')
                    .notEmpty().withMessage('Please enter the suggestion for client').bail()
                    .isLength({ min: 10, max: 500 }).withMessage(`Invalid suggestion`),
            ]
        }

    }

}