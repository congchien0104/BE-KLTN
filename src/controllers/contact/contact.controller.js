const db = require("../../models");
const { successResponse, errorResponse } = require("../../helpers/index");
const { Contact } = db;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.APP_SENDGRID_API_KEY);
import sendEmail from '../../config/sendgrid';



const createContact = async (req, res) => {
    try {
        //const { userId } = req.user;
        const contact = await Contact.create({
          fullname: req.body.fullname,
          email: req.body.email,
          subject: req.body.subject,
          message: req.body.message,
        });
    
        return successResponse(req, res, { contact });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
  };

const temp = async (req, res) => {
  console.log('check Health');
  const msg = {
    to: 'congchien0104@gmail.com',
    from: process.env.APP_EMAIL_SENDGRID_FROM, // Use the email address or domain you verified above
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  try {
    const result = await sendEmail.confirmationEmail(msg);
    return successResponse(req, res, { result });
  } catch(error) {
    return errorResponse(req, res, error.message);
  }
  console.log('ok');
};
  
  module.exports = { createContact, temp };