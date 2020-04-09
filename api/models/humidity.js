'use strict';
module.exports = (sequelize, DataTypes) => {
  const humidity = sequelize.define('humidity', {
    humidity: 
    {
      type: DataTypes.STRING,
      allowNull : false,
      
    },
    deviceID : DataTypes.STRING,
    zone : DataTypes.STRING,
  }, {});
  humidity.associate = function(models) {
    // associations can be defined here
  };
  return humidity;
};