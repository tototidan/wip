var Wind = require("../../models").wind
var utils = require("../utils")
const axios = require('axios');


function fetchWind() {
    axios.get('http://52.14.112.188:3000/api/v1/wind')
    .then(async function (response) {
        
        for (var element in response.data.wind) {
            aobj = response.data.wind[element];
            let device = await utils.deviceExist(aobj.id, aobj.zone);
            addOrReplacewind(device, aobj['km/h'])
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

async function addOrReplacewind(device, wind) {
    let tempObj = await Wind.count({ where: { deviceID: device.id } });
    if (tempObj < 20) {
        Wind.create({ wind: wind, deviceID: device.id })
    }
    else {
        let oldRecord = await Wind.findAll({
            limit: 1,
            where: {
                deviceID: device.id
            },
            order: [['updatedAt', 'ASC']]
        })


        Wind.update({ wind: wind }, { where: { id: oldRecord[0].id } })
    }
}



module.exports = fetchWind;