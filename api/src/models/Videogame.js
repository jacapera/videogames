const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    idGameRawg:{
      type: DataTypes.INTEGER,
      unique: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion:{
      type: DataTypes.TEXT,
    },
    plataformas:{
      type: DataTypes.JSON,
      defaultValue: [],
    },
    imagen:{
      type: DataTypes.STRING,
    },
    fechaDeLanzamiento:{
      type: DataTypes.DATEONLY,
    }
  }, {timestamps: false});
};
