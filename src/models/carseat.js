'use strict';
module.exports = (sequelize, DataTypes) => {
  const CarSeat = sequelize.define('CarSeat', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
  CarSeat.associate = function(models) {
    CarSeat.belongsTo(models.Car, {
      foreignKey: {
        name: 'carId',
        allowNull: false
      },
      as: 'cars'
    });
    CarSeat.createCarSeat = async function (car) {
      for(var i = 1; i <=car.capacity; i++){
        let carSeat = await this.create({
          name: "A" + i,
          status: false,
          carId: car.id,
        });
      }
      return true;
    };
    CarSeat.updateStatus = async function (arr) {
      for(var i = 0; i <arr.length; i++){
        let carSeat = await this.update({ status: true }, { where: { name: arr[i] } });
      }
      return true;
    };
  };
  return CarSeat;
};