import conn from "../config/conn.js"; 
import { DataTypes } from "sequelize"; 


const Cliente = conn.define(
  "clientes", 
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true, 
    },
    nome: {
      type: DataTypes.STRING, 
      allowNull: false, 
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true, 
    },
    telefone: {
      type: DataTypes.STRING, 
      allowNull: false, 
    },
    endereco: {
      type: DataTypes.STRING, 
      allowNull: false, 
    },
  },
  {
    tableName: "clientes",
  }
);

export default Cliente;
