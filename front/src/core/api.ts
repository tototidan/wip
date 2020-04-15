import axios from "axios"
export default class Api {
    static apiUrl = "http://localhost:4000/api/v1/device";

    static getDeviceStatus(deviceId: number) {
        return axios.get(this.apiUrl + "/state?device=device_"+deviceId);
    }

    static getDeviceInfos(deviceId: number) {
        return axios.get(this.apiUrl + "?device=device_"+deviceId);
    }
}
