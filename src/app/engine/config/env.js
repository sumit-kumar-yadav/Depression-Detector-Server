

const development = {
    db: 'mental_health',
    mongodbAtlasUrl: process.env.MENTAL_HEALTH_MONGO_DEV_URL,
    jwt_secret: 'Avengers',
    auth_token_expiry_hour: 24,
    smtp: {
        service: "gmail",
        auth: {
            user: process.env.MENTAL_HEALTH_EMAIL,
            pass: process.env.MENTAL_HEALTH_EMAIL_PASS
        }
    }
}

const production = {

}

module.exports = eval(process.env.MENTAL_HEALTH_PRODUCTION_ENVIRONMENT) == undefined ? development : eval(process.env.MENTAL_HEALTH_PRODUCTION_ENVIRONMENT);
