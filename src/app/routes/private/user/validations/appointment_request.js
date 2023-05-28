const { body, param } = require('express-validator');

module.exports.validate = (reqType) => {

    switch (reqType) {

        case 'getRequestAppointment': {
            return [
                param('doctorId')
                    .notEmpty().withMessage('Doctor id cannot be empty').bail()
                    .isLength({ min: 10, max: 50 }).withMessage(`Invalid Doctor id`),
            ]
        }

        case 'putPendingAppointment': {
            return [
                param('clientId')
                    .notEmpty().withMessage('Client id cannot be empty').bail()
                    .isLength({ min: 10, max: 50 }).withMessage(`Invalid Client id`),
                body('appointment_status')
                    .notEmpty().withMessage('Appointment_status cannot be empty').bail()
                    .isIn(["accepted", "rejected"]).withMessage("Appointment status can either be accepted or rejected"),
                body('appointment_notes')
                    .notEmpty().withMessage('Enter appointment notes').bail()
                    .isLength({ min: 3, max: 100 }).withMessage(`Appointment notes should be greater than 3 and less than 100 characters`),
                body('appointment_date')
                    .optional()
                    .custom(async (value, { req }) => {
                        const clientTimezoneOffset = req.headers['timezone-offset'];
                        const currentDate = new Date();
                        let adjustedCurrentDate = currentDate;

                        if (clientTimezoneOffset != currentDate.getTimezoneOffset()) {
                            // Calculate the adjusted current date based on the client's timezone offset
                            adjustedCurrentDate = new Date(currentDate.getTime() + (clientTimezoneOffset * 60000)); // Multiply by 60000 to convert minutes to milliseconds
                        }
                        if (new Date(value) < adjustedCurrentDate) 
                            return Promise.reject("Invalid date.");
                    }),
                body('appointment_description')
                    .optional()
                    .isLength({ min: 3, max: 500 }).withMessage(`Appointment description should be greater than 3 and less than 500 characters`),
            ]
        }

        case 'putAcceptedAppointment': {
            return [
                param('clientId')
                    .notEmpty().withMessage('Client id cannot be empty').bail()
                    .isLength({ min: 10, max: 50 }).withMessage(`Invalid Client id`),
                body('appointment_status')
                    .notEmpty().withMessage('Appointment_status cannot be empty').bail()
                    .isIn(["rejected", "completed"]).withMessage("Appointment status can either be rejected or completed"),
                
            ]
        }

        case 'postGetAppointments': {
            return [
                body('appointment_status')
                    .optional()
                    .isIn(["pending", "accepted", "rejected", "completed", "expired", "cancelled-by-client"]).withMessage("Incorrect appointment status."),
                
            ]
        }

        case 'putCancelAppointment': {
            return [
                param('doctorId')
                    .notEmpty().withMessage('Doctor id cannot be empty').bail()
                    .isLength({ min: 10, max: 50 }).withMessage(`Invalid Doctor id`),
            ]
        }

    }

}