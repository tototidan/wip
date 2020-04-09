var Device = require("../models").device

/*
* if the device exist in base return it, else create and return
*/
async function deviceExist(name, zone) {
    let device = await Device.findOne({ where: { name: name } });
    if (device == null) {
        let test = await Device.create({ name: name, zone : zone })
        return test;
    }
    else {
        return device
    }
}

async function getDevice(name)
{
    return await Device.findOne({ where: { name: name } });
    
}

module.exports = 
{
    deviceExist,
    getDevice
}