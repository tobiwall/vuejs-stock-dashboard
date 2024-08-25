<template>
    <div class="line-chart">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement)
  
  export default {
    name: 'RevenueLineChart',
    components: {
      Line
    },
    data() {
      return {
        chartData: {
          labels: [
            'Q1 2021', 'Q2 2021', 'Q3 2021', 'Q4 2021',
            'Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022',
            'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'
          ],
          datasets: [
            {
              label: 'Apple',
              data: [40, 55, 50, 60, 65, 70, 85, 90, 75, 80, 100, 85],
              borderColor: '#39DAFF',
              backgroundColor: 'rgba(57, 218, 255, 0.2)',
              fill: true,
              tension: 0.3,
              borderWidth: 1,
              pointRadius: 0
            },
            {
              label: 'Meta',
              data: [30, 45, 55, 50, 60, 65, 80, 70, 85, 90, 75, 95],
              borderColor: '#31BFE2',
              backgroundColor: 'rgba(49, 191, 226, 0.2)',
              fill: true,
              tension: 0.3,
              borderWidth: 1,
              pointRadius: 0
            },
            {
              label: 'Microsoft',
              data: [50, 65, 60, 70, 75, 80, 90, 100, 85, 95, 105, 100],
              borderColor: '#29A5C5',
              backgroundColor: 'rgba(41, 165, 197, 0.2)',
              fill: true,
              tension: 0.3,
              borderWidth: 1,
              pointRadius: 0
            },
            {
              label: 'Google',
              data: [35, 50, 55, 70, 80, 75, 90, 85, 95, 110, 100, 105],
              borderColor: '#218AA8',
              backgroundColor: 'rgba(33, 138, 168, 0.2)',
              fill: true,
              tension: 0.3,
              borderWidth: 1,
              pointRadius: 0
            },
            {
              label: 'Amazon',
              data: [25, 40, 50, 60, 55, 70, 80, 85, 90, 95, 110, 100],
              borderColor: '#196F8C',
              backgroundColor: 'rgba(25, 111, 140, 0.2)',
              fill: true,
              tension: 0.3,
              borderWidth: 1,
              pointRadius: 0
            },
            {
              label: 'Tesla',
              data: [15, 35, 45, 55, 50, 65, 75, 80, 85, 90, 80, 85],
              borderColor: '#11546F',
              backgroundColor: 'rgba(17, 84, 111, 0.2)',
              fill: true,
              tension: 0.3,
              borderWidth: 1,
              pointRadius: 0
            },
            {
              label: 'Nvidia',
              data: [30, 40, 60, 55, 70, 80, 90, 85, 100, 105, 95, 110],
              borderColor: '#093A52',
              backgroundColor: 'rgba(9, 58, 82, 0.2)',
              fill: true,
              tension: 0.3,
              borderWidth: 1,
              pointRadius: 0
            }
          ]
        },
        chartOptions: {
          responsive: true,
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
            }
          },
          scales: {
            x: {
              grid: {
                display: true,
                color: '#ffffff',
                borderColor: '#ffffff'
              }
            },
            y: {
              beginAtZero: false,
              suggestedMin: 30,
              suggestedMax: 120,
              ticks: {
                stepSize: 30,
                callback: function(value) {
                  return `$${value}`;
                }
              },
              grid: {
                display: true,
                color: '#ffffff',
                borderColor: '#ffffff'
              }
            }
          }
        }
      }
    }
}
  </script>
  
  <style scoped>
  .line-chart {
    width: 480px;
    height: 270px;
    margin-top: 48px;
  }
  </style>
  