'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Contact.associate = function(models) {
    // Contact.belongsTo(models.User, {
    //   foreignKey: {
    //     name: "userId",
    //     allowNull: false,
    //   },
    //   as: "user",
    // });
  };
  return Contact;
};