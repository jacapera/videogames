const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('genre', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    idGenreRawg:{
      type: DataTypes.INTEGER,
      unique: true,
    },
    name:{
      type: DataTypes.STRING,
    }
  }, {timestamps: false})
};