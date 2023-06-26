const { DataTypes } = require('sequelize');
//const { v4: uuidv4 } = require('uuid');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    description:{
      type: DataTypes.TEXT,
    },
    platforms:{
      type: DataTypes.JSON,
      defaultValue: [],
    },
    image:{
      type: DataTypes.STRING,
    },
    released:{
      type: DataTypes.DATEONLY,
    },
    rating:{
      type: DataTypes.STRING,
    },
  }, {timestamps: false});
};
