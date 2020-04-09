var utils = require("../src/utils")
var Temperature = require("../models").temperature
var Humidity = require("../models").humidity
var Wind = require("../models").wind
var sequelize = require("sequelize").Sequelize
const axios = require('axios');

async function moyenneTemperatureForDevice(req,res)
{
    console.log(req)
    let device = await utils.getDevice(req.query.device)
    if(device != null)
    {
        let listTemp = await Temperature.findAll({where : {deviceID : device.id},attributes : [[sequelize.fn('AVG', sequelize.col('temperature')),"average"]], raw : true})
        res.json({ result : listTemp[0].average })
    }
    else
    {
        res.json({error : "Cant find device"})
    }
   
  
}

async function moyenneWindForDevice(req,res)
{
    let device = await utils.getDevice(req.query.device)
    if(device != null)
    {
        let listTemp = await Wind.findAll({where : {deviceID : device.id},attributes : [[sequelize.fn('AVG', sequelize.col('wind')),"average"]], raw : true})
        res.json({ result : listTemp[0].average })
    }
    else
    {
        res.json({error : "Cant find device"})
    }
  
}

async function moyenneHumidityForDevice(req,res)
{
    let device = await utils.getDevice(req.query.device)
    if(device != null)
    {
        let listTemp = await Humidity.findAll({where : {deviceID : device.id},attributes : [[sequelize.fn('AVG', sequelize.col('humidity')),"average"]], raw : true})
        res.json({ result : listTemp[0].average })
    }
    else
    {
        res.json({error : "Cant find device"})
    }
  
}

async function getDeviceInfo(req,res)
{
    let device = await utils.getDevice(req.query.device)
    if(device != null)
    {
        res.json(device)
    }
    else
    {
        res.json({error : "Cant find device"})
    }
}

async function getDeviceStatus(req,res)
{
    axios.get('http://52.14.112.188:3000/api/v1/ping?device='+req.query.device)
    .then(async function (response) {
        res.json({device : req.query.device, state : response.data.device })
        console.log(response.data.device)
    })
    .catch(function (error) {
        // handle error
        res.json({error : "Cant find device"})
    })
    
}


module.exports =  {
    moyenneTemperatureForDevice,
    moyenneWindForDevice,
    moyenneHumidityForDevice,
    getDeviceInfo,
    getDeviceStatus

}