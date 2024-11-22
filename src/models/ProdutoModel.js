import conn from "../config/conn.js";
import { DataTypes } from "sequelize";

const Produto = conn.define(
    "produtos",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estoque: {
            type: DataTypes.STRING,
        }
    },
    { tableName: "produtos", }
)
export default Produto