"use strict";
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      creator: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Company.associate = function (models) {
    // associations can be defined here
    Company.hasMany(models.Car, {
      foreignKey: {
        name: "companyId",
        allowNull: false,
      },
      as: "cars",
    });
    Company.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      as: 'user'
    });
    Company.hasMany(models.Line, {
      foreignKey: {
        name: "companyId",
        allowNull: false,
      },
      as: "lines",
    });
    Company.hasMany(models.Reservation, {
      foreignKey: {
        name: "companyId",
        allowNull: false,
      },
      as: "reservations",
    });
  };
  return Company;
};
