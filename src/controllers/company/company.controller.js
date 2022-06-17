const db = require("../../models");
const { successResponse, errorResponse } = require("../../helpers/index");
const { Company, Car, Route, Schedule, User, Line } = db;

// Get all Company

const getAllCompanies = async (req, res) => {
  try {
    // const page = req.params.page || 1;
    // const limit = 2;
    // const companies = await Company.findAndCountAll({
    //   order: [
    //     ["createdAt", "DESC"],
    //     ["name", "ASC"],
    //   ],
    //   offset: (page - 1) * limit,
    //   limit,
    // });
    const companies = await Company.findAll();
    return successResponse(req, res, { companies });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const getCompany = async (req, res) => {
  try {
    //const companyId = req.params.companyId;
    var { userId } = req.user;
    console.log(userId);
    const result = await User.findOne({
      attributes: { exclude: ['id', 'countryId', 'caseFullname', 'casePhone', 'createdAt', 'caseCommunityName', 'deletedAt'] },
      where: { id: userId },
      include: [
        {
          model: Company,
          as: "company",
          include: [
            {
              model: Car,
              as: "cars",
            },
          ],
        },
      ],
    });
    return successResponse(req, res, { result });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const createCompany = async (req, res) => {
  console.log(req.body.image);
  try {
    var { userId } = req.user;
    const company = await Company.create({
      creator: userId,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      image: req.body.image,
      disabled: true,
      userId: userId,
    });
    return successResponse(req, res, { company });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const confirmed = async (req, res) => {
  try {
    const id = req.params.id;
    const disabled = false;
    const company = await Company.findOne({
      where: { id: id },
    });
    if (!company) {
      return res.status(400).send({ message: "Company not found!" });
    }
    await User.findOne({id: company.userId}).then((user) => {
      user.setRoles([2]);
    });
    await Company.update({ disabled: disabled }, { where: { id: id } });

    return successResponse(req, res, "Company was updated successfully.");
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

const getCarOfCompany = async (req, res) => {
  try {
    const id = req.params.companyId;
    const cars = await Company.findOne({
      where: { id: id },
      include: [
        {
          model: Car,
          as: "cars",
        },
      ],
    });
    return successResponse(req, res, { cars });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = { getAllCompanies, getCompany, createCompany, confirmed, getCarOfCompany };
