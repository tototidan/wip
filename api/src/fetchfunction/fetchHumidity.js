var request = require('request');
var Device = require("../../models").device
var Humidity = require("../../models").humidity
var deviceExist = require("../utils")
function fetchHumidity() {

    request('http://52.14.112.188:3000/api/v1/humidity', async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let jsonObj = JSON.parse(body);

            for (var element in jsonObj.humidity) {
                aobj = jsonObj.humidity[element];
                let device = await deviceExist(aobj.id);
                addOrReplaceHumidity(device, aobj['%'], aobj.zone)



            }

        }
    })
}

async function addOrReplaceHumidity(device, humidity, zone) {
    let tempObj = await Humidity.count({ where: { deviceID: device.id } });
    if (tempObj < 20) {
        Humidity.create({ humidity: humidity, deviceID: device.id, zone: zone })
    }
    else {
        let oldRecord = await Humidity.findAll({
            limit: 1,
            where: {
                deviceID: device.id
            },
            order: [['updatedAt', 'ASC']]
        })


        Humidity.update({ humidity: humidity, zone : zone }, { where: { id: oldRecord[0].id } })
    }
}



module.exports = fetchHumidity;