
var Device = require("../../models").device
var Temperature = require("../../models").temperature
var utils = require("../utils")
const axios = require('axios');


function  fetchTemperature() {
    axios.get('http://52.14.112.188:3000/api/v1/temperature')
    .then(async function (response) {
        for (var element in response.data.temperature) {
            aobj = response.data.temperature[element];
            await addOrReplaceTemperature(await utils.deviceExist(aobj.id, aobj.zone), aobj['°C'])
        }
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

}

async function addOrReplaceTemperature(device, temperature) {
    let tempObj = await Temperature.count({ where: { deviceID: device.id } });
    if (tempObj < 20) {
        Temperature.create({ temperature: temperature, deviceID: device.id })
    }
    else 
    {
        let oldRecord = await Temperature.findAll({
            limit: 1,
            where: {
                deviceID: device.id
            },
            order: [['updatedAt', 'ASC']]
        })


        Temperature.update({ temperature: temperature }, { where: { id: oldRecord[0].id } })
    }
}



module.exports = fetchTemperature;