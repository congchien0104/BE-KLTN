const db = require("../../models");
const { successResponse, errorResponse } = require("../../helpers/index");
const { User, Company, Car, Line, Journey } = db;
import Sequelize, { Op } from 'sequelize';
import { user } from '../../config/auth';


const createManyJourney = async (req, res) => {
  try {
    const journeys = await Journey.bulkCreate(req.body);

    return successResponse(req, res, { journeys });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const createJourney = async (req, res) => {
    try {
      const journey = await Journey.create(req.body);
  
      return successResponse(req, res, { journey });
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
};

const updateJourney = async (req, res) => {
    try {
      const journeyId = req.params.journeyId;

      const journey = await Journey.findOne({
        where: { id: journeyId },
      });
      console.log('dkm', journey);
      const result = await Journey.update(
        { ...journey, ...req.body },
        { where: { id: journeyId} },
      );
  
      return successResponse(req, res, { result });
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
};



const getJourneyLineList = async (req, res) => {
    try {
      const lineId = req.params.lineId;
      console.log(lineId);
      const journeys = await Journey.findAll({
        where: { lineId: lineId },
      })
      return successResponse(req, res, { journeys });
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
}

const deleteJourney = async (req, res) => {
    try {
        const journeyId = req.params.journeyId;
        await Journey.destroy({ where: { id: journeyId } });
        return successResponse(req, res, "Feedback was deleted successfully!");
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
}



module.exports = {
    createManyJourney,
    getJourneyLineList,
    createJourney,
    updateJourney,
    deleteJourney,
};
