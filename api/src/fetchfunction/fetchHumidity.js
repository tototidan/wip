var Device = require("../../models").device
var Humidity = require("../../models").humidity
var utils = require("../utils")
const axios = require('axios');


function fetchHumidity() {
    axios.get('http://52.14.112.188:3000/api/v1/humidity')
    .then(async function (response) {
        
        for (var element in response.data.humidity) {
            aobj = response.data.humidity[element];
            let device = await utils.deviceExist(aobj.id, aobj.zone);
            addOrReplaceHumidity(device, aobj['%'])
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

async function addOrReplaceHumidity(device, humidity) {
    let tempObj = await Humidity.count({ where: { deviceID: device.id } });
    if (tempObj < 20) {
        Humidity.create({ humidity: humidity, deviceID: device.id })
    }
    else {
        let oldRecord = await Humidity.findAll({
            limit: 1,
            where: {
                deviceID: device.id
            },
            order: [['updatedAt', 'ASC']]
        })


        Humidity.update({ humidity: humidity }, { where: { id: oldRecord[0].id } })
    }
}



module.exports = fetchHumidity;