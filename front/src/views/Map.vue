<template>
    <v-row  class="mt-12" style="height: 1000px;">
        <l-map :center="center"
               :zoom="zoom"
               :max-bounds="maxBounds"
               :min-zoom="maxZoom">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-marker v-for="device in devices" :key="device" :lat-lng="device.zone"></l-marker>
        </l-map>
    </v-row>
</template>

<script>
    import {LMap, LTileLayer, LMarker} from "vue2-leaflet";
    import api from "../core/api";

    export default {
        name: "Map",
        components: {
            LMap,
            LTileLayer,
            LMarker
        },
        data() {
            return {
                zoom: 6,
                center: [46.79491, 3.03207],
                maxBounds: [[29.228890, -56.777343], [62.103882, 45.300781]],
                maxZoom: 5,
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
                    const response = await api.getDeviceInfos(i);
                    response.data.zone = response.data.zone.split(',');
                    this.devices.push(response.data);
                }
                console.log(this.devices);
            }
        }
    }
</script>

<style scoped>

</style>
