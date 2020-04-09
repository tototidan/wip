var request = require('request');
var Wind = require("../../models").wind
var deviceExist = require("../utils")
function fetchWind() {

    request('http://52.14.112.188:3000/api/v1/wind', async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let jsonObj = JSON.parse(body);

            for (var element in jsonObj.wind) {
                let aobj = jsonObj.wind[element];
                let device = await deviceExist(aobj.id);
                console.log(aobj)
                addOrReplacewind(device, aobj['km/h'], aobj.zone)



            }

        }
    })
}

async function addOrReplacewind(device, wind, zone) {
    console.log(wind)
    let tempObj = await Wind.count({ where: { deviceID: device.id } });
    if (tempObj < 20) {
        Wind.create({ wind: wind, deviceID: device.id, zone: zone })
    }
    else {
        let oldRecord = await Wind.findAll({
            limit: 1,
            where: {
                deviceID: device.id
            },
            order: [['updatedAt', 'ASC']]
        })


        Wind.update({ wind: wind, zone : zone }, { where: { id: oldRecord[0].id } })
    }
}



module.exports = fetchWind;