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
  name: 'RevenueBarChart',
  components: {
    Bar
  },
  data() {
    const netIncomeData = [
      { label: 'Apple', value: 95 },
      { label: 'Meta', value: 85 },
      { label: 'Microsoft', value: 75 },
      { label: 'Google', value: 65 },
      { label: 'Amazon', value: 55 },
      { label: 'Tesla', value: 45 },
      { label: 'Nvidia', value: 35 }
    ]

    // Sortiere die Daten absteigend nach Wert
    const sortedData = netIncomeData.sort((a, b) => b.value - a.value)
    
    return {
      chartData: {
        labels: sortedData.map(item => item.label),
        datasets: [{
          label: 'Net Income (TTM)',
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
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return `${tooltipItem.dataset.label}: $${tooltipItem.raw} Billion`;
              }
            }
          },
          datalabels: {
            display: true,
            align: 'start',
            anchor: 'end',
            formatter: function(value) {
              return `$${value} Billion`;
            },
            color: '#ffffff',
            font: {
              weight: 'bold'
            },
            padding: {
              left: 10
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              stepSize: 20,
              callback: function(value) {
                return value; // Keine zusätzlichen Zeichen
              }
            },
            grid: {
              display: true,
              color: 'rgba(255, 255, 255, 0.2)', // Horizontale Rasterlinien mit Transparenz
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }
          },
          y: {
            grid: {
              display: true,
              color: 'rgba(255, 255, 255, 0.2)' // Vertikale Rasterlinien mit Transparenz
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.horizontal-bar-chart {
  width: 480px;
  height: 200px;
}
</style>
