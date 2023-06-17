const { DataTypes, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('crypto');

module.exports = (sequelize) => {
  sequelize.define('genre', {
    id:{
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    nombre:{
      type: DataTypes.STRING,
    }
  })
};