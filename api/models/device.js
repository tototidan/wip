'use strict';
module.exports = (sequelize, DataTypes) => {
  const device = sequelize.define('device', {
    name: 
    {
      type: DataTypes.STRING,
      unique: true
    },
    zone : DataTypes.STRING,
  }, {});
  device.associate = function(models) {
    // associations can be defined here
  };
  return device;
};