const db = require("../../models");
const { successResponse, errorResponse } = require("../../helpers/index");
const { Company, Car, User, Feedback, Seat, CarSeat, Line, Journey } = db;
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
      console.log(req.query['order']);
      const temp = parseInt(req.query["order"]);
      console.log(typeof temp);
      console.log(orderFilter[temp].name, orderFilter[temp].value);
      
      for (let q in req.query) {
          if(q !== "date" && q !== "order" && q !=="minprice" && q !== "maxprice"){
            var obj = {};
            obj[q] = { [Op.eq]: req.query[q] };
            where.push(obj);
          }
      }
      console.log(req.query);
      const cars = await Car.findAll({
          attributes: {
            include: [
                [
                    Sequelize.literal(`(
                      SELECT SUM(rating)
                      FROM Feedbacks AS feedback
                      WHERE
                          feedback.carId = Car.id
                  )`),
                  'totalRating'
                ]
            ]
          },
          include: [
            {
              model: Line,
              as: "lines",
              where: {
                [Op.or]: where, // assign the "where" array here
                weekdays: {
                  [Op.substring]: `${d}`
                },
                price: {
                  [Op.between]: [req.query["minprice"], req.query["maxprice"]],
                }
              },
            },
            {
              model: Feedback,
              as: "feedbacks",
              include: [
                {
                  model: User,
                  as: "feedbacks",
                  attributes: { exclude: ['password'] }
                },
              ],
            },
          ],
          order: [
            [Sequelize.literal(orderFilter[temp].name), orderFilter[temp].value]
          ]
          // order: [
          //   [orderFilter[temp].name, orderFilter[temp].value]
          // ],
          //limit: 10
      });
      if (cars.length === 0) {
          return res.json({
              message: 'There are no case records for this query. Please unselect some items.'
          })
      };

      return successResponse(req, res, { cars});
  } catch (err) {
    return errorResponse(req, res, err.message);
  };
};

const getTemp = async (req, res) => {
  try {
    const carId = 18;
    const car = await Car.findOne({
      where: { id: carId },
      include: [
        {
          model: Line,
          as: "lines",
          include: [{
              model: Feedback,
              as: "feedbacks",
            }
          ]
        },
      ],
    });
    return successResponse(req, res, { car });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
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
          include: {
            model: Journey,
            as: "journeys"
          }
        },
      ],
    });
    const company = await Company.findOne({
      where: {id: car?.companyId}
    });
    return successResponse(req, res, { car, company });
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
        {
          model: Line,
          as: "lines",
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
    console.log(req.body);
    const car = await Car.create({
      name: req.body.name,
      plate_number: req.body.plate_number,
      capacity: req.body.capacity,
      type: req.body.type,
      // station_to: req.body.station_to,
      // price: req.body.price,
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

const getCarListOfCompany = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findOne({
      where: { id: userId},
      include: [
        {
          model: Company,
          as: "company",
        }
      ]
    });

    if (!user.company) {
      return res.send({ message: "Company not found!" });
    }

    console.log("test", user.company.id);

    const carList = await Car.findAll({
      where: {companyId: user?.company?.id},
      include: [
        {
          model: Line,
          as: "lines",
        },
      ],
    })
    return successResponse(req, res, { carList, company: user?.company || '' });
  } catch(error) {
    return errorResponse(req, res, error.message);
  }
}

module.exports = { getAllCars, getCar, createCar, updateCar, getCarSeat, getCarOfCompany, getCasesByFilteredRecord, getTemp, getCarListOfCompany };
