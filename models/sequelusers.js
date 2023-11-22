import { DataTypes } from "sequelize";
import { sq } from "../config/dbConnection.js";

export const sequelusers = sq.define('patients', {
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
    IsUserGuideChecked: {
        type: DataTypes.STRING
    },
    IsInsulinPumpWithCoverChecked: {
        type: DataTypes.STRING
    },
    IsUsebCableChecked: {
        type: DataTypes.STRING
    },
    IsWalladapterChecked: {
        type: DataTypes.STRING
    },
    IsPumpchargerChecked: {
        type: DataTypes.STRING
    },
    IsRechargableBatteryChecked: {
        type: DataTypes.STRING
    },
    IsPumpclipChecked: {
        type: DataTypes.STRING
    },
    step: {
        type: DataTypes.STRING
    },
})

sequelusers.sync({ alter: true }).then(() => {
    console.log("User Model synced");
});