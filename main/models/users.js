"use strict";
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};