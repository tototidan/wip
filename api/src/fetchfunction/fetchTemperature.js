var request = require('request');
var Device = require("../../models").device
var Temperature = require("../../models").temperature
var deviceExist = require("../utils")
function fetchTemperature() {

    request('http://52.14.112.188:3000/api/v1/temperature', async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let jsonObj = JSON.parse(body);

            for (var element in jsonObj.temperature) {
                aobj = jsonObj.temperature[element];
                let device = await deviceExist(aobj.id);
                addOrReplaceTemperature(device, aobj['°C'], aobj.zone)



            }

        }
    })
}

async function addOrReplaceTemperature(device, temperature, zone) {
    let tempObj = await Temperature.count({ where: { deviceID: device.id } });
    if (tempObj < 20) {
        Temperature.create({ temperature: temperature, deviceID: device.id, zone: zone })
    }
    else {
        let oldRecord = await Temperature.findAll({
            limit: 1,
            where: {
                deviceID: device.id
            },
            order: [['updatedAt', 'ASC']]
        })


        Temperature.update({ temperature: temperature, zone : zone }, { where: { id: oldRecord[0].id } })
    }
}



module.exports = fetchTemperature;