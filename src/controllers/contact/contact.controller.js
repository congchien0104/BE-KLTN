const db = require("../../models");
const { successResponse, errorResponse } = require("../../helpers/index");
const { Contact } = db;


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
  
  module.exports = { createContact };