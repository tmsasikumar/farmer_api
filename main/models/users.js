"use strict";
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("users", {
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
            allowNull: false,
            unique: {
                msg: 'Email already exist.'
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Phone number already exist.'
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};