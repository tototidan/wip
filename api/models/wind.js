'use strict';
module.exports = (sequelize, DataTypes) => {
  const wind = sequelize.define('wind', {
    wind: 
    {
      type: DataTypes.STRING,
      allowNull : false,
      
    },
    deviceID : DataTypes.STRING,
  }, {});
  wind.associate = function(models) {
    // associations can be defined here
  };
  return wind;
};