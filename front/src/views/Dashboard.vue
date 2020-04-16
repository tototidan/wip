<template>
    <div class="mt-12">
        <v-row class="mx-6">
            <average-data class="mx-6"></average-data>
            <v-card class="mt-12 pa-3 small">
                <span class="title">Chart</span>
                <v-select class="mx-5" :items="datatypes" v-model="selectedType"></v-select>
                <v-select class="mx-5" :items="devices" v-model="selectedDevice" item-text="name" item-value="id"></v-select>
                <v-card-actions>
                    <v-btn class="mx-12" @click="reload()" color="primary">Valider</v-btn>
                </v-card-actions>
                <chart ref="chart" class="mx-5" :id="selectedDevice" :datatype="selectedType"></chart>
            </v-card>
        </v-row>
    </div>
</template>

<script>
    import AverageData from "../components/AverageData";
    import Chart from "../components/Chart";
    export default {
        name: "Dashboard",
        components: {Chart, AverageData},
        data: () => {return {
            datatypes: ['temperature', 'wind', 'humidity'],
            selectedType: 'temperature',
            devices: [{
                name: 'device_1',
                id: 1
            },{
                name: 'device_2',
                id: 2
            },{
                name: 'device_3',
                id: 3
            },{
                name: 'device_4',
                id: 4
            },{
                name: 'device_5',
                id: 5
            },{
                name: 'device_6',
                id: 6
            },{
                name: 'device_7',
                id: 7
            }],
            selectedDevice: 1
        }
        },
        methods: {
            reload() {
                this.$refs.chart.reload();
            }
        }
    }
</script>

<style scoped>
    .small {
        height: 650px;
    }
</style>
