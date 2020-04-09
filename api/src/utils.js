var Device = require("../models").device

/*
* if the device exist in base return it, else create and return
*/
async function deviceExist(name) {
    let device = await Device.findOne({ where: { name: name } });
    if (device == null) {
        let test = await Device.create({ name: name })
        return test;
    }
    else {
        return device
    }
}

module.exports = deviceExist;