const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require("../models");
const { User, Role, UserRole } = db;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    //console.log(req.user);
    req.user = decoded.user;
    //console.log(req.userId);
    next();
  });
};

const isAdmin = async (req, res, next) => {
  // console.log(req.user);
  // next();
  // const user = await User.findOne({
  //   where: { id: req.userId },
  //   include: [
  //     {
  //       model: Role,
  //       as: "roles",
  //       where: { name: "admin"}
  //     },
  //   ],
  // });
  // if(user){
  //   next();
  // }else{
  //     res.status(403).send({
  //     message: "Require Admin Role!",
  //     });
  // }
  User.findByPk(req.user.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name == "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

const isCompany = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name == "company") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Company Role!",
      });
      return;
    });
  });
};

const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!",
      });
    });
  });
};

const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isCompany: isCompany,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;
