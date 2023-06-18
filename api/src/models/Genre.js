const { DataTypes, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('crypto');

module.exports = (sequelize) => {
  sequelize.define('genre', {
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
    },
    idGenreRawg:{
      type: DataTypes.INTEGER,
      unique: true,
    },
    nombre:{
      type: DataTypes.STRING,
    }
  }, {timestamps: false})
};