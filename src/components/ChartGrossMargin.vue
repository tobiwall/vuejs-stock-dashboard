<template>
    <div class="horizontal-bar-chart">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)

export default {
    name: 'ChartGrossMargin',
    components: {
        Bar
    },
    data() {
        const grossMarginData = [
            { label: 'Apple', value: 24.8 },
            { label: 'Meta', value: 24.3 },
            { label: 'Microsoft', value: 12.5 },
            { label: 'Google', value: 12.2 },
            { label: 'Amazon', value: 12.7 },
            { label: 'Tesla', value: 5.7 },
            { label: 'Nvidia', value: 6.2 }
        ]

        // Sortiere die Daten absteigend nach Wert
        const sortedData = grossMarginData.sort((a, b) => b.value - a.value)

        return {
            chartData: {
                labels: sortedData.map(item => item.label),
                datasets: [{
                    label: 'Gross Margin (%)',
                    data: sortedData.map(item => item.value),
                    backgroundColor: [
                        '#39DAFF',
                        '#31BFE2',
                        '#29A5C5',
                        '#218AA8',
                        '#196F8C',
                        '#11546F',
                        '#093A52'
                    ],
                    borderColor: '#fff',
                    borderWidth: 1
                }]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
                            }
                        }
                    },
                    datalabels: {
                        display: true,
                        align: 'end',
                        anchor: 'end',
                        formatter: function (value) {
                            return `${value}%`;
                        },
                        color: '#ffffff',
                        font: {
                            weight: 'bold'
                        },
                        padding: {
                            right: 10
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 50, // Begrenze die X-Achse auf 50
                        ticks: {
                            stepSize: 10,
                            callback: function (value) {
                                return value; // Keine zusätzlichen Zeichen
                            }
                        },
                        title: {
                            display: false // Entfernt die X-Achsen-Beschriftung
                        },
                        grid: {
                            display: true,
                            color: 'rgba(255, 255, 255, 0.2)', // Weniger auffällige Rasterlinien durch Transparenz
                            borderColor: 'rgba(255, 255, 255, 0.2)' // Transparente Randfarbe
                        }
                    },
                    y: {
                        grid: {
                            display: true, // Zeigt horizontale Rasterlinien an
                            color: 'rgba(255, 255, 255, 0.2)', // Weniger auffällige Rasterlinien durch Transparenz
                        },
                        maxBarThickness: 40 // Dynamische Höhe der Balken
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.horizontal-bar-chart {
    width: 250px;
    height: 200px;
}
</style>
