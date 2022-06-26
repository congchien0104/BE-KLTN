const db = require("../../models");
const randomstring = require("randomstring");
const { successResponse, errorResponse } = require("../../helpers/index");
const { User, Car, Reservation, Schedule, Route, CarSeat, Company } = db;
const paypal = require('paypal-rest-sdk');
const paypalConfig = require('../../config/paypal');
paypal.configure(paypalConfig);
import sequelize, { Op } from 'sequelize';
import car from '../../models/car';

// const createReservation = async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const carId = req.params.carId;
//     console.log(req.body);

//     const car = await Car.findOne({ where: { id: carId } });
//     if (!car) {
//       return res.send({ message: "Car not found!" });
//     }

//     const reservation = await Reservation.create({
//       receipt_number: randomstring.generate(10),
//       amount: req.body.amount,
//       paid_amount: req.body.paid_amount || 0,
//       paid_date: new Date(),
//       reservation_date: new Date(),
//       carId: carId,
//       userId: userId,
//       quantity: req.body.quantity,
//       fullname: req.body.fullname,
//       phone: req.body.phone,
//       email: req.body.email,
//     });

//     return successResponse(req, res, "Success");
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

const createPaypal = async (req, res) => {
  const { userId } = req.user;
  const { arr, fullname, receipt_number, amount, reservations_date } = req.body;
  // const dataToSave = req.body;

  // const resDateToSave = (dataToSave || []).map((item) => {
  //   return {
  //     ...item,
  //     receipt_number: randomstring.generate(10),
  //     paid_date: new Date(),
  //     userId: userId,
  //     paid_amount: 0,
  //   }
  // });
  // console.log(resDateToSave);

  //const reservation = await Reservation.bulkCreate(resDateToSave);
  
  //Nếu thanh toán
  if (amount > 0) {
    const costUSD = Math.round((amount / 22600) * 100) / 100;
    console.log("ok", costUSD);
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `http://localhost:8080/payments/paypal?costUSD=${costUSD}`,
        cancel_url: "http://localhost:3000/payment-denied",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: fullname,
                sku: receipt_number,
                price: costUSD,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: costUSD,
          },
          description: receipt_number,
        },
      ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            //sendSuccess(res, payment.links[i].href, httpStatus.OK);
            Reservation.createReservation({...req.body, companyId: 2});
            //CarSeat.updateStatus(arr);
            return successResponse(req, res, payment.links[i].href);
          }
        }
      }
    });
  } else {
    // Nếu không thanh toán
    //return successResponse(req, res, "Đã thanh toán thành công");
    return errorResponse(req, res, "Đã thanh toán không thành công");
  }
  //   sendSuccess(res, {}, httpStatus.CREATED, 'Đã tạo cuộc hẹn');
};

const doPaymentServicePackage = async (req, res, next) => {
    // console.log("DkMMM");
    // res.send("okkkkkkkkkkk");
  const paymentId = req.query.paymentId;
  console.log(paymentId);
  const payerId = req.query.PayerID;
  const costUSD = req.query.costUSD;
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: costUSD,
        },
      },
    ],
  };
  let success = true;
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        success = false;
        console.log(error.response);
      } else {
        console.log("Successfully paid");
      }
    }
  );
  //console.log(success, appointment, paymentType);
  if (!success) {
    //await appointmentService.deleteAppointment({ appointmentId: appointment });
    res.redirect("http://localhost:3000/payment-denied");
  } else {
    //const appointmentDetail = await appointmentService.getAppointmentById(appointment);
    //appointmentDetail.payment = paymentType;
    //await appointmentDetail.save();
    res.redirect("http://localhost:3000/payment-success");
  }
};

// calculate total amount
const getTotalAmount = async (req, res) => {
  try {
    const total = await Reservation.sum('amount');
    const amountOfCompany = await Reservation.findAll({
      attributes: [
        'carId',
        [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
      ],
      group: ['companyId'],
      order: sequelize.fn('sum', sequelize.col('amount')),
      include: [
        {
          model: Company,
          as: "company",
        },
      ],
    });
    return successResponse(req, res, { total: total, amountOfCompany: amountOfCompany });
  } catch(error) {
    return errorResponse(req, res, error.message);
  }
}

const getTotalCompanyOfCar = async (req, res) => {
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

      const total = await Reservation.sum('amount', { where: { companyId: user?.company?.id }});

      const totalListCar = await Reservation.findAll({
        where: {companyId: user?.company?.id },
        attributes: [
          'carId',
          [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
        ],
        group: ['carId'],
        include: [
          {
            model: Car,
            as: "cars",
          },
        ],
        // order: sequelize.fn('sum', sequelize.col('amount')),
      })

      return successResponse(req, res, { total: total, totalListCar: totalListCar });
    } catch(error) {
      return errorResponse(req, res, error.message);
    }
}

const getTotalOfCompany = async (req, res) => {
  try {
    const carId = req.params.carId;
    const d = req.query.date;
    const total = await Reservation.findAll({ where: { carId: carId}});
    return successResponse(req, res, { total });
  } catch(error) {
    return errorResponse(req, res, error.message);
  }
}

const createReservation = async (req, res) => {
  try {
    const { userId } = req.user;
    const carId = req.params.carId;
    console.log(req.body);

    const car = await Car.findOne({ where: { id: carId } });
    if (!car) {
      return res.send({ message: "Car not found!" });
    }
    const temp = res.body.arr;

    const reservation = await Reservation.create({
      receipt_number: randomstring.generate(10),
      amount: data.amount,
      paid_amount: data.amount,
      paid_date: new Date(),
      reservation_date: new Date(data.reservations_date),
      carId: data.carId,
      userId: 14,
      quantity: data.quantity,
      fullname: data.fullname,
      phone: data.phone,
      email: data.email,
      cccd: data.cccd,
      pickup_place: data.pickup_place,
      dropoff_place: data.dropoff_place,
      position: temp.join(","),
      status: ticketStatus.active,
    });

    return successResponse(req, res, reservation);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {
  createPaypal,
  doPaymentServicePackage,
  getTotalAmount,
  getTotalOfCompany,
  createReservation,
  getTotalCompanyOfCar,
};
