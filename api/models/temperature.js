'use strict';
module.exports = (sequelize, DataTypes) => {
  const temperature = sequelize.define('temperature', {
    temperature: 
    {
      type: DataTypes.STRING,
      allowNull : false,
      
    },
    deviceID : DataTypes.STRING,
    zone : DataTypes.STRING,
  }, {});
  temperature.associate = function(models) {

    // associations can be defined here
  };
  return temperature;
};