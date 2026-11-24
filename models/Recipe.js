import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Recipe = sequelize.define(
    "Recipe",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        area: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName: "recipes",
        timestamps: true
    }
);

export default Recipe;