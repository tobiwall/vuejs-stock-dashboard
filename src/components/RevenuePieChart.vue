<!-- src/components/RevenuePieChart.vue -->
<template>
    <div class="pie-chart">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Doughnut } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement)
  
  export default {
    name: 'RevenuePieChart',
    components: {
      Doughnut
    },
    data() {
      return {
        chartData: {
          labels: ['Apple', 'Meta', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Nvidia'],
          datasets: [{
            label: 'Revenue (in Billion USD)',
            data: [100, 85, 90, 110, 95, 80, 105], // Beispielwerte
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
          cutout: '45%', // Macht den inneren Kreis
          plugins: {
            legend: {
              display: false // Legend in Chart.js deaktivieren, da wir sie separat anzeigen
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.label}: $${tooltipItem.raw} Billion`;
                }
              }
            }
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .pie-chart {
    height: 100%;
  }
  
  .pie-chart canvas {
    border-radius: 50%; /* Damit der Rand rund ist */
  }
  </style>
  