<template>
    <div class="small">
        <line-chart :chart-data="datacollection"></line-chart>
    </div>
</template>

<script>
    import LineChart from './LineChart.js'
    import api from "../core/api";

    export default {
        name: "Chart",
        components: {
            LineChart
        },
        data () {
            return {
                datacollection: null
            }
        },
        props: {
            id: {
                type: Number,
                required: true
            },
            datatype: {
                type: String,
                required: true
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.reload();
            })
        },
        methods: {
            async reload() {
                const response = await api.getDatasFromDevice(this.id, 20);
                const data = JSON.parse(response.data[this.datatype]);
                this.datacollection = {
                    labels: data.map((data) => data.createdAt.substr(11, 8)),
                    datasets: [
                        {
                            label: this.datatype,
                            backgroundColor: '#f87979',
                            data: data.map((data) => data[this.datatype])
                        }
                    ]
                }
                console.log(this.datacollection)
            }
        }
    }
</script>

<style scoped>
    .small {
        max-width: 600px;
    }
</style>
