'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Photo.associate = function(models) {
    Photo.belongsTo(models.Car, {
      foreignKey: {
        name: 'carId',
        allowNull: false
      },
      as: 'cars'
    });
  };
  return Photo;
};