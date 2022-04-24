"use strict";
module.exports = (sequelize, DataTypes) => {
  const Roleuser = sequelize.define(
    "Roleuser",
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  return Roleuser;
};
