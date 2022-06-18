const db = require("../../models");
const { successResponse, errorResponse } = require("../../helpers/index");
const { User, Company, Car, Line, Journey } = db;
import Sequelize, { Op } from 'sequelize';
import { user } from '../../config/auth';



export const getLinesList = async (req, res) => {
  try {
    const userId = req.params.companyId;
    //console.log(companyId);
    const lines = await User.findOne({
      where: { id: userId },
      include: [{
        model: Company,
        as: "company",
        include: [
          {
            model: Line,
            as: "lines",
            include: [
              {
                model: Journey,
                as: "journeys",
              },
              {
                model: Car,
                as: "lines",
              },
            ]
          },
        ]
      }]
    });
    // const lines = await Company.findOne({
    //   where: { id: companyId },
    //   include: [
    //     {
    //       model: Line,
    //       as: "lines",
    //       include: [
    //         {
    //           model: Journey,
    //           as: "journeys",
    //         },
    //         {
    //           model: Car,
    //           as: "lines",
    //         },
    //       ]
    //     },
    //   ]
    // })
    return successResponse(req, res, { lines });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const getJourneyLineList = async (req, res) => {
  try {
    const lineId = req.params.lineId;
    const journeys = await Journey.findAll({
      where: { lineId: lineId },
    })
    return successResponse(req, res, { journeys });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

const getLine = async (req, res) => {
  try {
    const lineId = req.params.id;
    const line = await Line.findOne({
      where: { id: lineId},
      include: [
        {
          model: Journey,
          as: "journeys",
        },
      ],
    });
    return successResponse(req, res, { line });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
const createLine = async (req, res) => {
  try {
    const companyId = req.params.id;
    //console.log(carId);
    const company = await Company.findOne({ where: { id: companyId } });
    if (!company) {
      return res.send({ message: "Company not found!" });
    }
    const temp = req.body.weekdays;
    const line = await Line.create({
      carId: 11,
      start: req.body.start,
      destination: req.body.destination,
      departure_time: req.body.departure_time,
      arrival_time: req.body.arrival_time,
      innitiated_date: req.body.innitiated_date,
      weekdays: temp.join(","),
      price: req.body.price,
      station: req.body.station,
      station_to: req.body.station_to,
      companyId: companyId,
    });
    return successResponse(req, res, { line });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const updateLine = async (req, res) => {
  try {
    const lineId = req.params.id;
    const line = await Line.findOne({
      where: { id: lineId },
    });
    const temp = req.body.weekdays;
    req.body.weekdays = temp.join(",");
    console.log(req.body.weekdays);
    await Line.update(
      { ...line, ...req.body },
      { where: { id: line.id } }
    );

    return successResponse(req, res, line);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {
    createLine,
    getLine,
    updateLine,
    getLinesList,
    getJourneyLineList,
};
