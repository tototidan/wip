<template>
    <v-row  class="mt-12" style="height: 1000px;">
        <l-map :center="center"
               :zoom="zoom"
               :max-bounds="maxBounds"
               :min-zoom="maxZoom">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-marker v-for="device in devices" :key="device" :lat-lng="device.zone">
                <l-popup>
                    Device: {{device.name}} <br>
                    Temp: {{device.temp}} C° <br>
                    Wind: {{device.wind}} km/h <br>
                    Hum: {{device.hum}} g/m3 <br>
                </l-popup>
            </l-marker>
        </l-map>
    </v-row>
</template>

<script>
    import {LMap, LTileLayer, LMarker, LPopup} from "vue2-leaflet";
    import api from "../core/api";

    export default {
        name: "Map",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup
        },
        data() {
            return {
                zoom: 10,
                center: [44.7333, -0.3667],
                maxBounds: [[43.228890, -5.777343], [46.103882, 5.300781]],
                maxZoom: 9,
                devices: null,
            }
        },
        mounted() {
            this.getDevicesInfos();
        },
        methods: {
            async getDevicesInfos() {
                this.devices = [];
                for (let i = 1; i<8; i++) {
                    let response = await api.getDeviceInfos(i);
                    const device = {zone: [], name: "", wind: "", temp: "", hum: ""};
                    device.zone = response.data.zone.split(',');
                    device.name = response.data.name;
                    response = await api.getDatasFromDevice(i);
                    const data = response.data;
                    device.wind = JSON.parse(data.wind)[0].wind;
                    device.temp = JSON.parse(data.temperature)[0].temperature;
                    device.hum = JSON.parse(data.humidity)[0].humidity;
                    this.devices.push(device);
                }
                console.log(this.devices);
            }
        }
    }
</script>

<style scoped>

</style>
