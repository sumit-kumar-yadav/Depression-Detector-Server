const nodemailer = require("nodemailer");
const env = require('./env');


const transporter = nodemailer.createTransport(env.smtp);


module.exports = {
    transporter,
}