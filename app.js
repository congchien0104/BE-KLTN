import express from "express";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import cors from "cors";

// import publicRoutes from "./src/routes/public";
// import apiRoutes from "./src/routes/api";
import adminRoutes from "./src/routes/admin";
// import apiMiddleware from "./src/middleware/apiAuth";
// import adminMiddleware from "./src/middleware/adminAuth";
import errorHandler from "./src/middleware/errorHandler";

//const userRoutes = require("./src/routes/user");
const authRoute = require("./src/routes/auth.route");
const userRoute = require("./src/routes/user.route");
const companyRoute = require("./src/routes/company.route");
const carRoute = require("./src/routes/car.route");
const scheduleRoute = require("./src/routes/schedule.route");
const feedbackRoute = require("./src/routes/feedback.route");
const reservationRoute = require("./src/routes/reservation.route");
const routeImage = require("./src/routes/image");
const paymentRoute = require("./src/routes/payment.route");
const contactRoute = require("./src/routes/contact.route");
const lineRoute = require("./src/routes/line.route");
const authJwt = require("./src/middleware/authJwt");

dotenv.config();
require("./src/config/sequelize");

const app = express();
var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
};

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to congchien application." });
});

app.use("/auth", authRoute);
app.use("/user", authJwt.verifyToken, userRoute);
app.use("/companies", authJwt.verifyToken, companyRoute);
app.use("/cars", carRoute);
app.use("/schedules", scheduleRoute);
app.use("/feedbacks", feedbackRoute);
app.use("/reservations", reservationRoute);
app.use("/contacts", contactRoute);
app.use("/payments", paymentRoute);
app.use("/lines", lineRoute);
app.use("/", routeImage);

// app.use('/pub', publicRoutes);
// app.use('/api', apiMiddleware, apiRoutes);
app.use('/api/admin', [authJwt.verifyToken, authJwt.isAdmin], adminRoutes);
app.use(errorHandler);

module.exports = app;
