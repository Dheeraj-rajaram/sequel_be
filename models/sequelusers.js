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
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },

})

sequelusers.sync({ alter: true }).then(() => {
    console.log("User Model synced");
});