"use strict";
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    "Feedback",
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  Feedback.associate = function (models) {
    // associations can be defined here
    Feedback.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      as: "feedbacks",
    });
    Feedback.belongsTo(models.Car, {
      foreignKey: {
        name: "carId",
        allowNull: false,
      },
      as: "fbacks",
    });
  };
  return Feedback;
};
