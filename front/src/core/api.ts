import axios from "axios"
export default class Api {
    static apiUrl = "http://localhost:4000/api/v1/device";

    static getDeviceStatus(deviceId: number) {
        return axios.get(this.apiUrl + "/state?device=device_"+deviceId);
    }

    static getDeviceInfos(deviceId: number) {
        return axios.get(this.apiUrl + "/position?device=device_"+deviceId);
    }

    static getAvgData(deviceId: number, dataType: string) {
        return axios.get(this.apiUrl + "/"+dataType+"/moyenne?device=device_"+deviceId);
    }

    static getDatasFromDevice(deviceId: number, limit = 1, desc = false) {
        const order = desc ? "DESC" : "ASC";
        return axios.get(this.apiUrl+"?device=device_"+deviceId+"&limit="+limit+"&order="+order);
    }
}
