<template>
    <div>
        <v-card class="mt-12 mx-3 pa-3">
            <span class="title">Average Data</span>
            <v-select class="mx-3" :items="dataTypes" v-model="selectedType" v-on:change="reloadData()" label="Choose the displayed data"></v-select>
            <v-btn class="ml-3" @click="reloadData">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-list>
                <v-list-item class="ml-3" v-for="device in devices" :key="device">{{device.device}} : {{device.data}} {{selectedType === 'temperature' ? "C°" : selectedType === 'humidity' ? "g/m3" : "km/h"}}</v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script>
    import api from "../core/api";

    export default {
        name: "AverageData",
        data() {
            return {
                selectedType: 'temperature',
                dataTypes: ['temperature', 'wind', 'humidity'],
                devices: null
            }
        },
        mounted() {
            this.reloadData();
        },
        methods: {
            async reloadData() {
                this.devices = [];
                for (let i = 1; i<8; i++) {
                    const response = await api.getAvgData(i, this.selectedType);
                    this.devices.push({device: "device_"+i, data: response.data.result});
                }
                console.log(this.devices);
            }
        }
    }
</script>

<style scoped>

</style>
