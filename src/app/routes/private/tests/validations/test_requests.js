const { body, param } = require('express-validator');

module.exports.validate = (reqType) => {

    switch (reqType) {

        case 'postGetDepressionPrediction': {
            return [
                body('input')
                    .notEmpty().withMessage('Input cannot be empty').bail()
                    .isLength({ min: 10, max: 5000 }).withMessage(`Input can't be less than 10 characters and greater than 5000.`),
            ]
        }

        case 'postGetAnxietyPrediction': {
            return [
                body('input')
                    .notEmpty().withMessage('Input cannot be empty').bail()
                    .isLength({ min: 10, max: 5000 }).withMessage(`Input can't be less than 10 characters and greater than 5000.`),
            ]
        }

        case 'postGetStressPrediction': {
            return [
                body('input')
                    .notEmpty().withMessage('Input cannot be empty').bail()
                    .isLength({ min: 10, max: 5000 }).withMessage(`Input can't be less than 10 characters and greater than 5000.`),
            ]
        }

    }

}