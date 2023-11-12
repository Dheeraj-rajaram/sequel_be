import { Sequelize } from "sequelize";

export const sq = new Sequelize('testDb', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

export const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};