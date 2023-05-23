const { body, param } = require('express-validator');
// const User = require('../../../../engine/models/user');

module.exports.validate = (reqType) => {

    switch (reqType) {

        case 'putUserPassword': {
            return [
                body('old_password')
                    .notEmpty().withMessage('Please enter the old password'),
                body('new_password')
                    .notEmpty().withMessage('Please enter the new password').bail()
                    .isLength({ min: 6, max: 15 }).withMessage('Password must be between 6 and 15 characters').bail()
                    .matches(/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!@$#%]).*$/).withMessage('Weak password. Password must include atleast 1 upper, 1 lowercase, 1 number and a special characters.'),
                
               
            ]
        }

        

    }

}