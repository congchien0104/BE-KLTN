"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Feedbacks", [
      {
        content: "Rất thích nhà xe. Phục vụ rất tốt.",
        rating: 5,
        userId: 10,
        carId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Chất lượng tốt, lần sau sẽ tiếp tục ủng hộ nhà xe.",
        rating: 4,
        userId: 11,
        carId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Phục vụ xe không được thỏa mái, nhà xe coi lại cách phục vụ.",
        rating: 2,
        userId: 9,
        carId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Phục vụ rất tốt, tiếp tục ủng hộ nhà xe.",
        rating: 5,
        userId: 12,
        carId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Feedbacks", null, {});
  },
};
