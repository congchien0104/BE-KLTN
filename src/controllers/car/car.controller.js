const db = require("../../models");
const { successResponse, errorResponse } = require("../../helpers/index");
const { Company, Car, Route, Schedule, Seat, CarSeat, Line, Journey } = db;
import {orderFilter} from '../../constants/order';
import Sequelize, { INET, Op } from 'sequelize';

const getAllCars = async (req, res) => {
  try {
    console.log(req.query.page);
    const page = req.query.page || 1;
    const limit = 8;
    const cars = await Car.findAndCountAll({
      order: [
        ["createdAt", "DESC"],
        ["name", "ASC"],
      ],
      include: [
        {
          model: Line,
          as: "lines",
        },
      ],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { cars });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const getCasesByFilteredRecord = async (req, res) => {
  try {
      var where = [];
      const day = new Date(req.query["date"]);
      const d = day.getDay();
      //console.log(d);
      const temp = parseInt(req.query["order"]);
      //console.log(typeof temp);
      //console.log(orderFilter[temp].name, orderFilter[temp].value);
      
      for (let q in req.query) {
          if(q !== "date" && q !== "order" && q !=="minprice" && q !== "maxprice"){
            var obj = {};
            obj[q] = { [Op.eq]: req.query[q] };
            where.push(obj);
          }
      }
      console.log(req.query);
      const cars = await Line.findAll({
          include: [
            {
              model: Car,
              as: "lines",
              // where: {
              //   type: "Limousine"
              // }
              //order: [['start', 'DESC']]
            },
          ],
          where: {
              [Op.or]: where, // assign the "where" array here
              weekdays: {
                [Op.substring]: `${d}`
              },
              price: {
                [Op.between]: [req.query["minprice"], req.query["maxprice"]],
              }
          },
          order: [
            [orderFilter[temp].name, orderFilter[temp].value]
          ],
          limit: 10
      });
      if (cars.length === 0) {
          return res.json({
              message: 'There are no case records for this query. Please unselect some items.'
          })
      };

      return successResponse(req, res, { cars });
  } catch (err) {
    return errorResponse(req, res, err.message);
  };
};

const getCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const car = await Car.findOne({
      where: { id: carId },
      include: [
        {
          model: Line,
          as: "lines",
        },
      ],
    });
    return successResponse(req, res, { car });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const getCarSeat = async (req, res) => {
  try {
    const carId = req.params.carId;
    const car = await Car.findOne({
      where: { id: carId },
      include: [
        {
          model: CarSeat,
          as: "carseats",
        },
      ],
    });

    const line = await Line.findOne({
      where: { carId: car.id }
    });

    const journeys = await Journey.findAll({
      where: { lineId: line.id }
    });

    return successResponse(req, res, { car: car, line: line, journeys: journeys });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const createCar = async (req, res) => {
  try {
    const companyId = req.params.id;
    console.log(req.body.name);
    const company = await Company.findOne({ where: { id: companyId } });
    if (!company) {
      return res.send({ message: "Company not found!" });
    }
    const car = await Car.create({
      name: req.body.name,
      plate_number: req.body.plate_number,
      capacity: req.body.capacity,
      station: req.body.station,
      station_to: req.body.station_to,
      price: req.body.price,
      image: req.body.image,
      status_trip: false,
      companyId: companyId,
    });
    let carseat = await CarSeat.createCarSeat(car);
    
    return successResponse(req, res, car);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const getCarOfCompany = async (req, res) => {
  try {
    const id = req.params.companyId;
    const cars = await Company.findAll({
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

const updateCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const car = await Car.findOne({
      where: { id: carId },
    });
    await Car.update(
      { ...car, ...req.body },
      { where: { id: carId } }
    );

    return successResponse(req, res, "Car was updated successfully.");
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = { getAllCars, getCar, createCar, updateCar, getCarSeat, getCarOfCompany, getCasesByFilteredRecord };
