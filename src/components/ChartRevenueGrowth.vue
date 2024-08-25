<template>
    <div class="column-chart">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  // Falls 'chartjs-plugin-datalabels' verwendet wird, deaktiviere es.
  import ChartDataLabels from 'chartjs-plugin-datalabels'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)
  
  export default {
    name: 'ChartRevenueGrowth',
    components: {
      Bar
    },
    data() {
      return {
        chartData: {
          labels: ['Apple', 'Meta', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Nvidia'], // Firmennamen auf der X-Achse
          datasets: [
            {
              label: 'Q1',
              data: [20, 15, 25, 10, 5, 30, 20], // Beispielwerte für Q1
              backgroundColor: '#39DAFF'
            },
            {
              label: 'Q2',
              data: [25, 20, 30, 15, 10, 35, 25], // Beispielwerte für Q2
              backgroundColor: '#31BFE2'
            },
            {
              label: 'Q3',
              data: [30, 25, 35, 20, 15, 40, 30], // Beispielwerte für Q3
              backgroundColor: '#29A5C5'
            },
            {
              label: 'Q4',
              data: [35, 30, 40, 25, 20, 45, 35], // Beispielwerte für Q4
              backgroundColor: '#218AA8'
            }
          ]
        },
        chartOptions: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'right', // Legende rechts anzeigen
              align: 'center' // Vertikale Ausrichtung der Legende
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
                }
              }
            },
            // Deaktiviere die Datalabels
            datalabels: {
              display: false // Verhindert die Anzeige von Datenlabels in den Säulen
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 10,
                max: 90 // Maximale Höhe der Y-Achse
              },
              grid: {
                display: true,
                color: 'rgba(255, 255, 255, 0.2)',
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
  .column-chart {
    width: 480px;
    height: 280px; /* Höhe und Breite angepasst */
  }
  </style>
  