var express = require('express');
var router = express.Router();
var DeviceController = require("../controller/DeviceController")
var passport = require('passport')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/device/temperature/moyenne',function(req,res)
{
  DeviceController.moyenneTemperatureForDevice(req,res)
})

router.get('/api/v1/device/humidity/moyenne',function(req,res)
{
  DeviceController.moyenneHumidityForDevice(req,res)
})

router.get('/api/v1/device/wind/moyenne',function(req,res)
{
  DeviceController.moyenneWindForDevice(req,res)
})
router.get('/api/v1/device', function(req,res)
{
  DeviceController.getDeviceInfo(req,res)
})

router.get('/api/v1/device/state', function(req,res)
{
  DeviceController.getDeviceStatus(req,res)
})

router.get('/api/v1/device', function(req,res)
{
  DeviceController.getDeviceStatus(req,res)
})


module.exports = router;


