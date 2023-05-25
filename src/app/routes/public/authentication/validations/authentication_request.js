const { body, param } = require('express-validator');
const User = require('../../../../engine/models/user');

module.exports.validate = (reqType) => {

    switch (reqType) {

        case 'postSignupEmail': {
            return [
                body('first_name')
                    .notEmpty().withMessage('Please enter the first name').bail()
                    .isLength({ min: 3 }).withMessage('First name must be greater than 3 characters').bail()
                    .matches(/^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/).withMessage('Please enter the valid first name'),
                body('last_name')
                    .notEmpty().withMessage('Please enter the last name').bail()
                    .isLength({ min: 3 }).withMessage('Last name must be greater than 3 characters').bail()
                    .matches(/^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/).withMessage('Please enter the valid last name'),
                body('email')
                    .exists().withMessage("Please enter the email address").bail()
                    .toLowerCase()
                    .isEmail().withMessage("Please enter the valid email address")
                    .custom(async (value, { req }) => {
                        const user = await User.findOne({ email: value });
                        if (user) {
                            return Promise.reject('Email is already taken');
                        }
                    }),
                body('email_otp')
                    .notEmpty().withMessage('Please enter the otp sent on your email'),
                body('phone_number')
                    .optional()
                    .matches(/^\d{10}$/).withMessage('Please enter the valid phone number'),
                body('password')
                    .notEmpty().withMessage('Please enter the password').bail()
                    .isLength({ min: 6, max: 15 }).withMessage('Password must be between 6 and 15 characters').bail()
                    .matches(/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!@$#%]).*$/).withMessage('Weak password. Password must include atleast 1 upper, 1 lowercase, 1 number and a special characters.'),
                body('gender')
                    .notEmpty().withMessage('Please enter the gender').bail()
                    .isIn(['Male', 'Female', 'Others']).withMessage('Gender can be Male, Female or Others only'),
                body('timezone')
                    .optional()
                    .custom(async (value, { req }) => {
                        if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
                            throw "Time zones are not available in this environment"
                        }
                    
                        try {
                            Intl.DateTimeFormat(undefined, {timeZone: value});
                            return;
                        }
                        catch (ex) {
                            throw "Incorrect Timezone"
                        }
                    })
            ]
        }

        case 'postSigninEmail': {
            return [
                body('email')
                    .exists().withMessage("Please enter the email address").bail()
                    .toLowerCase()
                    .isEmail().withMessage("Please enter the valid email address"),
                body('password')
                    .notEmpty().withMessage('Please enter the password').bail(),
                // body('phone_number')
                //     .optional()
                //     .matches(/^\d{10}$/).withMessage('Please enter the valid phone number')
            ]
        }

        case 'otp': {
            return [
                body('email')
                    .exists().withMessage("Please enter the email address").bail()
                    .toLowerCase()
                    .isEmail().withMessage("Please enter the valid email address"),
            ]
        }

        case 'putResetPassword': {
            return [
                body('email')
                    .exists().withMessage("Please enter the email address").bail()
                    .toLowerCase()
                    .isEmail().withMessage("Please enter the valid email address"),
                body('new_password')
                    .notEmpty().withMessage('Please enter the new password').bail()
                    .isLength({ min: 6, max: 15 }).withMessage('Password must be between 6 and 15 characters').bail()
                    .matches(/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!@$#%]).*$/).withMessage('Weak password. Password must include atleast 1 upper, 1 lowercase, 1 number and a special characters.'),
            ]
        }

    }

}