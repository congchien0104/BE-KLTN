const db = require("../../models");
const { successResponse, errorResponse } = require("../../helpers/index");
const { Company, Car, Route, Schedule, Seat } = db;

const getAllRoutes = async (req, res) => {
  try {
    const lines = await Route.findAll({
      include: [
        {
          model: Schedule,
          as: "lines",
          include: [
            {
              model: Car,
              as: "schedules",
            },
          ],
        },
      ],
    });
    return successResponse(req, res, { lines });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// const getAllRoutes = async (req, res) => {
//   try {
//     const schedules = await Schedule.findAll({
//       include: [
//         {
//           model: Car,
//           as: "schedules",
//         },
//       ],
//     });
//     return successResponse(req, res, { schedules });
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

const getSheduleOfCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const car = await Car.findOne({
      where: { id: carId },
      include: [
        {
          model: Schedule,
          as: "schedules",
          include: [
            {
              model: Route,
              as: "carroutes",
            },
          ],
        },
      ],
    });
    return successResponse(req, res, { car });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const getSheduleOfRoute = async (req, res) => {
  try {
    const routeId = req.params.routeId;
    const route = await Route.findOne({
      where: { id: routeId },
      include: [
        {
          model: Schedule,
          as: "lines",
          include: [
            {
              model: Car,
              as: "schedules",
            },
          ],
        },
      ],
    });
    return successResponse(req, res, { route });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const createSchedule = async (req, res) => {
  try {
    const carId = req.params.carId;
    console.log(carId);
    const car = await Car.findOne({ where: { id: carId } });
    if (!car) {
      return res.send({ message: "Car not found!" });
    }
    const route = await Route.create({
      starting_point: req.body.starting_point,
      destination: req.body.destination,
      departture_time: req.body.departture_time,
      arrival_time: req.body.arrival_time,
    });
    route.setCars([carId]).then(() => {
      res.send("Success!");
    });
    //return successResponse(req, res, { car });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {
  getAllRoutes,
  getSheduleOfCar,
  getSheduleOfRoute,
  createSchedule,
};
