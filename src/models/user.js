"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      fullname: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      verified: {
        type: DataTypes.ENUM("Pending", "Active"),
        defaultValue: "Pending",
      },
      confirmationcode: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Role, {
      through: "Roleuser",
      foreignKey: "userId",
      as: "roles",
    });

    User.hasOne(models.RefreshToken, {
      foreignKey: "userId",
      as: "refreshtoken",
    });
    User.hasMany(models.Feedback, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      as: "feedbacks",
    });
    User.hasMany(models.Reservation, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      as: "reservations",
    });
    User.hasOne(models.Company, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      as: 'company'
    });
    // User.hasMany(models.Contact, {
    //   foreignKey: {
    //     name: "contactId",
    //     allowNull: false,
    //   },
    //   as: "contacts",
    // });
  };
  return User;
};
