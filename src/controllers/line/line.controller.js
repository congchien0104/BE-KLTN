const db = require("../../models");
const { successResponse, errorResponse } = require("../../helpers/index");
const { Company, Car, Line } = db;
import Sequelize, { Op } from 'sequelize';

const getLines = async (req, res) => {
  try {
    const carId = req.params.id;
    const status = req.query.status === "false" ? false : true;
    console.log(carId);
    console.log(status);
    const lines = await Line.findOne({
      // where: { [Op.and]: [
      //   { carId: carId },
      //   { status_trip: status }
      // ] },
      where: { carId: carId, status_trip: status},
      include: [
        {
          model: Car,
          as: "lines",
        },
      ],
    });
    return successResponse(req, res, { lines });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
const createLine = async (req, res) => {
  try {
    const carId = req.params.id;
    console.log(carId);
    const car = await Car.findOne({ where: { id: carId } });
    if (!car) {
      return res.send({ message: "Car not found!" });
    }
    const temp = req.body.weekdays;
    const line = await Line.create({
      carId: carId,
      start: req.body.start,
      destination: req.body.destination,
      departure_time: req.body.departure_time,
      arrival_time: req.body.arrival_time,
      innitiated_date: req.body.innitiated_date,
      weekdays: temp.join(","),
      // status_trip: req.body.status_trip,
      // start_route_trip: req.body.start_route_trip,
      // des_route_trip: req.body.des_route_trip,
      price: req.body.price,
      station: req.body.station,
      station_to: req.body.station_to,
    });
    return successResponse(req, res, { line });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const updateLine = async (req, res) => {
  try {
    const carId = req.params.id;
    const line = await Line.findOne({
      where: { carId: carId, status_trip: req.body.status_trip },
    });
    const temp = req.body.weekdays;
    req.body.weekdays = temp.join(",");
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
    getLines,
    updateLine
};
