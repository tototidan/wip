<template>
    <div class="mt-12">
        <v-card class="mt-12 mx-3 pa-3">
            <span class="title">Status</span>
            <v-btn class="ml-3" @click="getDevicesStatus">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
                <v-list>
                    <v-list-item class="ml-3" v-for="device in devices" :key="device">{{device.device}} : <v-icon :color="device.state === 'UP' ? 'green' : 'red'">mdi-circle</v-icon></v-list-item>
                </v-list>
        </v-card>
    </div>
</template>

<script>
    import {AxiosInstance as axios} from "axios";
    import api from "../core/api";

    export default {
        name: "deviceStatus",
        data: () => {
            return {
                devices: null
            }
        },
        mounted() {
            this.getDevicesStatus();
        },
        methods: {
            async getDevicesStatus() {
                this.devices = [];
                for (let i = 1; i<8; i++) {
                    const response = await api.getDeviceStatus(i);
                    this.devices.push(response.data);
                }
                console.log(this.devices);
            }
        }
    }
</script>

<style scoped>

</style>
