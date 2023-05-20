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
                    .isNumeric().withMessage('Invalid Longitude'),
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
                body('off_days')
                    .optional()
                    .isArray({ min: 0, max: 7 }).withMessage('off_days should be an array').bail()
                    .custom(async (value, { req }) => {
                        const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                        const isVisited = [false, false, false, false, false, false, false];
                        value.forEach(day => {
                            let index = weekDays.indexOf(day);
                            if(index != -1 && !isVisited[index]){
                                isVisited[index] = true;
                            }else{
                                throw `Off days can be only ${weekDays}`;
                            }
                        });
                        return;
                    })
                // body('opening_hours')
                //     .optional()
                //     .isArray({ min: 1, max: 7 }).withMessage('Please enter at least 1 opening day')
                //     .custom(async (value, { req }) => {
                    
                //         const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

                //         value.forEach(element => {
                //             // Check the correct keys in each object of the array
                //             const receivedObjKeys = Object.keys(element);
                //             const requiredObjKeys = ["day", "working_day", "periods"];
                //             if(!(receivedObjKeys.length == requiredObjKeys.length && receivedObjKeys.every((key, i) => key === requiredObjKeys[i])))
                //                 throw "Incorrect keys of opening_hours"

                //             // Check the correct day value 
                //             if(weekDays.indexOf(element.day) == -1) 
                //                 throw `Day should be ${weekDays}`;

                //             // Check the correct working_day value 
                //             if(element.working_day != 'yes' || element.working_day != 'no') 
                //                 throw "Working day should be either yes or no";

                //             // Check if the periods is an array or not
                //             if(!Array.isArray(element.periods))
                //                 throw "periods should be array";
                            
                //             // Check if it's working day without any period 
                //             if((element.working_day == 'yes' && element.periods.length <= 0)) 
                //                 throw "Please enter at least 1 opening time period.";
                //             if(element.working_day == 'yes' && element.periods.length >= 1){
                //                 element.periods.forEach(period => {
                //                     const periodKeys = Object.keys(period);
                //                     const requiredPeriodKeys = ["start", "end"]; 
                //                     if(!(periodKeys.length == requiredPeriodKeys.length && periodKeys.every((key, i) => key === requiredPeriodKeys[i])))
                //                         throw "Incorrect period keys"
                //                 });
                //             }

                //             // If it's non working day then
                //             if(element.working_day == 'no' && element.periods.length != 0)
                //                 throw  `periods ahould be an empty array on ${element.day} as it's non working day`
                //         });

                //     })

            ]
        }

        case 'putDoctorDetails': {
            return [
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
                body('degree')
                    .optional()
                    .isArray({ min: 1, max: 20 }).withMessage('Please enter at least 1 degree'),
                body('highest_qualification')
                    .optional()
                    .isLength({ min: 2, max: 20 }).withMessage(`Highest qualification can't be less than 2 characters and greater than 20.`).bail(),
                body('specialist')
                    .optional()
                    .isLength({ min: 2, max: 20 }).withMessage(`Specilization name can't be less than 2 characters and greater than 20.`).bail(),
                body('experience_in_yrs')
                    .optional()
                    .isNumeric().withMessage('Only Decimals allowed').bail()
                    .isLength({ min: 0, max: 100 }).withMessage(`Please enter a valid experience in years.`),
                body('per_session_fee')
                    .optional()
                    .isLength({ min: 0 }).withMessage(`Please enter valid per session fee`),
                body('discount')
                    .optional()
                    .isLength({ min: 0 }).withMessage(`Discount can't be negative value`),
                body('website')
                    .optional()
                    .isURL().withMessage(`Please enter a valid URL`)
                    .isLength({ min: 0 }).withMessage(`Please enter a valid URL`),
                body('off_days')
                    .optional()
                    .isArray({ min: 0, max: 7 }).withMessage('off_days should be an array')
                    .custom(async (value, { req }) => {
                        const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                        const isVisited = [false, false, false, false, false, false, false];
                        value.forEach(day => {
                            let index = weekDays.indexOf(day);
                            if(index != -1 && !isVisited[index]){
                                isVisited[index] = true;
                            }else{
                                throw `Off days can be only ${weekDays}`;
                            }
                        });
                        return;
                    })
                

            ]
        }

    }

}