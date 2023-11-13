import { DataTypes } from "sequelize";
import { sq } from "../config/dbConnection.js";

export const sequelusers = sq.define('sequelusers', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    dob: {
        type: DataTypes.STRING
    },
    phonenumber: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aedBattery: {
        type: DataTypes.STRING
    },
    twistedSystem: {
        type: DataTypes.STRING
    },
    infustion: {
        type: DataTypes.STRING
    },
    incertion: {
        type: DataTypes.STRING
    },
    step: {
        type: DataTypes.STRING
    },

})

sequelusers.sync({ alter: true }).then(() => {
    console.log("User Model synced");
});