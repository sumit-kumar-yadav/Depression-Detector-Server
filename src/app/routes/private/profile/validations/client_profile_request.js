const { body, param } = require('express-validator');
const User = require('../../../../engine/models/user');

module.exports.validate = (reqType) => {

    switch (reqType) {

        case 'postClientDetails': {
            return [
                body('street')
                    .notEmpty().withMessage('Please enter the street').bail()
                    .isLength({ min: 3, max: 50 }).withMessage(`Street name can't be less than 3 characters and greater than 50.`),
                body('city')
                    .notEmpty().withMessage('Please enter the city name').bail()
                    .isLength({ min: 3, max: 30 }).withMessage(`City name can't be less than 3 characters and greater than 30.`),
                body('pincode')
                    .notEmpty().withMessage('Please enter the city name').bail()
                    .isLength({ min: 3, max: 15 }).withMessage(`Pincode can't be less than 3 characters and greater than 15.`),
                body('state')
                    .notEmpty().withMessage('Please enter the state name').bail()
                    .isLength({ min: 3, max: 30 }).withMessage(`State can't be less than 3 characters and greater than 30.`),
                body('country')
                    .notEmpty().withMessage('Please enter the country').bail()
                    .isLength({ min: 3, max: 20 }).withMessage(`Country name can't be less than 3 characters and greater than 20.`).bail(),
                body('latitude')
                    .notEmpty().withMessage('Invalid Latitude')
                    .isNumeric().withMessage('Invalid Latitude')
                    .custom(async (value, { req }) => {
                        // Check if latitude and longitude are within valid ranges
                        if (value < -90 || value > 90) 
                            return Promise.reject("Invalid latitude.");
                    }),
                body('longitude')
                    .notEmpty().withMessage('Invalid Longitude')
                    .isNumeric().withMessage('Invalid Longitude')
                    .custom(async (value, { req }) => {
                        // Check if latitude and longitude are within valid ranges
                        if (value < -180 || value > 180) 
                            return Promise.reject("Invalid longitude.");
                    }),
            ]
        }

        case 'putClientDetails': {
            return [
                body('account_type')
                    .optional()
                    .isIn(["private", "public"]).withMessage("Account type can only be public or private."),
                body('street')
                    .optional()
                    .isLength({ min: 3, max: 50 }).withMessage(`Street name can't be less than 3 characters and greater than 50.`),
                body('city')
                    .optional()
                    .isLength({ min: 3, max: 30 }).withMessage(`City name can't be less than 3 characters and greater than 30.`),
                body('pincode')
                    .optional()
                    .isLength({ min: 3, max: 15 }).withMessage(`Pincode can't be less than 3 characters and greater than 15.`),
                body('state')
                    .optional()
                    .isLength({ min: 3, max: 30 }).withMessage(`State can't be less than 3 characters and greater than 30.`),
                body('country')
                    .optional()
                    .isLength({ min: 3, max: 20 }).withMessage(`Country name can't be less than 3 characters and greater than 20.`).bail(),
                body('latitude')
                    .optional()
                    .isNumeric().withMessage('Invalid Latitude')
                    .custom(async (value, { req }) => {
                        // Check if latitude and longitude are within valid ranges
                        if (value < -90 || value > 90) 
                            return Promise.reject("Invalid latitude.");
                    }),
                body('longitude')
                    .optional()
                    .isNumeric().withMessage('Invalid Longitude')
                    .custom(async (value, { req }) => {
                        // Check if latitude and longitude are within valid ranges
                        if (value < -180 || value > 180) 
                            return Promise.reject("Invalid longitude.");
                    }),
            ]
        }

    }

}