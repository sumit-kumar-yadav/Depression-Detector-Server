const { body, param } = require('express-validator');


module.exports.validate = (reqType) => {

    switch (reqType) {

        case 'postDoctorDetails': {
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
                    .notEmpty().withMessage('Please enter the password').bail()
                    .isLength({ min: 3, max: 20 }).withMessage(`Country name can't be less than 3 characters and greater than 20.`).bail(),
                body('degree')
                    .notEmpty().withMessage('Please enter the degree').bail()
                    .isArray({ min: 1, max: 20 }).withMessage('Please enter at least 1 degree'),
                body('highest_qualification')
                    .notEmpty().withMessage('Please enter the highest qualification').bail()
                    .isLength({ min: 2, max: 20 }).withMessage(`Highest qualification can't be less than 2 characters and greater than 20.`).bail(),
                body('specialist')
                    .notEmpty().withMessage('Please enter the specilization name').bail()
                    .isLength({ min: 2, max: 20 }).withMessage(`Specilization name can't be less than 2 characters and greater than 20.`).bail(),
                body('experience_in_yrs')
                    .notEmpty().withMessage('Please enter the experience in years').bail()
                    .isNumeric().withMessage('Only Decimals allowed').bail()
                    .isLength({ min: 0, max: 100 }).withMessage(`Please enter a valid experience in years.`),
                body('per_session_fee')
                    .notEmpty().withMessage('Please enter session fee').bail()
                    .isLength({ min: 0 }).withMessage(`Please enter valid per session fee`),
                body('discount')
                    .optional()
                    .isLength({ min: 0 }).withMessage(`Discount can't be negative value`),
                body('website')
                    .optional()
                    .isURL().withMessage(`Please enter a valid URL`)
                    .isLength({ min: 0 }).withMessage(`Please enter a valid URL`),
                body('opening_hours')
                    .optional()
                    .isArray({ min: 1, max: 7 }).withMessage('Please enter at least 1 opening day')
                    .custom(async (value, { req }) => {
                    
                        const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

                        value.forEach(element => {
                            if(weekDays.indexOf(element.day) == -1) 
                                throw `Day should be ${weekDays}`;
                            if(element.working_day != 'yes' || element.working_day != 'no') 
                                throw "Working day should be either yes or no";
                            if((element.working_day == 'yes' && !element.periods) || (element.working_day == 'yes' && element.periods.isLength <= 0)) 
                                throw "Please enter at least 1 opening time period.";
                            // To do
                        });

                    })

            ]
        }

        case 'putDoctorDetails': {
            return [
                
            ]
        }

    }

}