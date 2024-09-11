<!-- src/components/RevenueLineChart.vue -->
<template>
  <!-- Diagrammkomponente für die Darstellung des Liniendiagramms -->
  <div class="line-chart">
    <Line ref="chart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'; // Importiere die Line-Komponente von vue-chartjs
import { Chart as ChartJS, Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { getSortedStockData } from '@/services/stockService'; // Importiere die Funktion zum Abrufen von Aktienmarktdaten

// Registriere notwendige Chart.js-Komponenten
ChartJS.register(Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement);

export default {
  name: 'RevenueLineChart', // Name der Komponente
  components: {
    Line, // Registriere die Line-Komponente
  },
  data() {
    return {
      chartData: this.initializeChartData(), // Initialisiere die Daten für das Diagramm
      chartOptions: this.initializeChartOptions(), // Initialisiere die Optionen für das Diagramm
    };
  },
  methods: {
    // Funktion zur Initialisierung der Datenstruktur des Diagramms
    initializeChartData() {
      return {
        labels: [
          'Q1 2021', 'Q2 2021', 'Q3 2021', 'Q4 2021',
          'Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022',
          'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023',
        ],
        datasets: [
          // Initialisiere die Datensätze für jedes Unternehmen
          { label: 'Apple', data: [], borderColor: '#39DAFF', backgroundColor: 'rgba(57, 218, 255, 0.2)', fill: true, tension: 0.3, borderWidth: 1, pointRadius: 0 },
          { label: 'Meta', data: [], borderColor: '#31BFE2', backgroundColor: 'rgba(49, 191, 226, 0.2)', fill: true, tension: 0.3, borderWidth: 1, pointRadius: 0 },
          { label: 'Microsoft', data: [], borderColor: '#29A5C5', backgroundColor: 'rgba(41, 165, 197, 0.2)', fill: true, tension: 0.3, borderWidth: 1, pointRadius: 0 },
          { label: 'Google', data: [], borderColor: '#218AA8', backgroundColor: 'rgba(33, 138, 168, 0.2)', fill: true, tension: 0.3, borderWidth: 1, pointRadius: 0 },
          { label: 'Amazon', data: [], borderColor: '#196F8C', backgroundColor: 'rgba(25, 111, 140, 0.2)', fill: true, tension: 0.3, borderWidth: 1, pointRadius: 0 },
          { label: 'Tesla', data: [], borderColor: '#11546F', backgroundColor: 'rgba(17, 84, 111, 0.2)', fill: true, tension: 0.3, borderWidth: 1, pointRadius: 0 },
          { label: 'Nvidia', data: [], borderColor: '#093A52', backgroundColor: 'rgba(9, 58, 82, 0.2)', fill: true, tension: 0.3, borderWidth: 1, pointRadius: 0 },
        ],
      };
    },
    // Funktion zur Initialisierung der Optionen des Diagramms
    initializeChartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Verberge die Legende
          },
          tooltip: {
            // Konfiguriere den Tooltip
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.dataset.label}: $${tooltipItem.raw} Billion`, // Format für den Tooltip-Text
            },
          },
          datalabels: {
            display: false, // Verhindert die Anzeige von Datenlabels im Diagramm
          },
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: 'rgba(255, 255, 255, 0.3)', // Mehr Transparenz
              borderColor: 'rgba(255, 255, 255, 0.3)', // Mehr Transparenz
            },
          },
          y: {
            beginAtZero: false,
            suggestedMin: 30,
            suggestedMax: 120,
            ticks: {
              stepSize: 30,
              callback: (value) => `$${value}`, // Format für die Y-Achsenbeschriftung
            },
            grid: {
              display: true,
              color: 'rgba(255, 255, 255, 0.3)', // Mehr Transparenz
              borderColor: 'rgba(255, 255, 255, 0.3)', // Mehr Transparenz
            },
          },
        },
      };
    },
    // Funktion, die die Zuordnung von Unternehmen zu Tabellenblattnamen und den Anfangsindex für die Daten zurückgibt
    getCompanyDataConfig() {
      return {
        companySheetMap: {
          Apple: 'AAPL',
          Meta: 'META',
          Microsoft: 'MSFT',
          Google: 'GOOG',
          Amazon: 'AMZN',
          Tesla: 'TSLA',
          Nvidia: 'NVDA',
        },
        initialDataIndexMap: {
          Apple: 3,
          Amazon: 7,
          Google: 3,
          Meta: 3,
          Microsoft: 7,
          Nvidia: 3,
          Tesla: 11,
        },
      };
    },
    // Hauptfunktion zum Abrufen und Verarbeiten von Daten
    async fetchData() {
      const { companySheetMap, initialDataIndexMap } = this.getCompanyDataConfig(); // Hole die Konfiguration für die Daten

      try {
        const dataPromises = this.createDataPromises(companySheetMap, initialDataIndexMap); // Erstelle Promises für den Datenabruf
        const results = await Promise.all(dataPromises); // Warte auf die Auflösung aller Promises
        this.updateChartData(results); // Aktualisiere die Daten im Diagramm
        this.updateChartLabels(results); // Aktualisiere die Labels im Diagramm
        this.updateChart(); // Aktualisiere das Diagramm
        console.log('This is data', results);
        
      } catch (error) {
        console.error('Failed to load data:', error); // Fehlerbehandlung
      }
    },
    // Funktion zum Erstellen der Promises für den Datenabruf
    createDataPromises(companySheetMap, initialDataIndexMap) {
      return Object.keys(companySheetMap).map((company, index) => {
        const sheetName = companySheetMap[company]; // Tabellenblattname für das Unternehmen
        const rowIndex = initialDataIndexMap[company]; // Anfangsindex für die Daten des Unternehmens
        return getSortedStockData(sheetName, rowIndex).then((data) => {
          const sortedEntries = data.sortedEntries.slice(-12); // Die letzten 12 Quartale (3 Jahre)

          return {
            company,
            index,
            sortedEntries,
          };
        });
      });
    },
    // Funktion zur Aktualisierung der Diagrammdaten
    updateChartData(results) {
      results.forEach((result) => {
        if (result.index !== -1) {
          // Extrahiere und parse die Datenpunkte
          const dataPoints = result.sortedEntries.map(([, value]) => parseFloat(value.replace(',', '.')));
          // Aktualisiere die Daten für das jeweilige Unternehmen im Diagramm
          this.chartData.datasets[result.index].data = dataPoints;
          console.log('Das ist chartData', result.company , this.chartData.datasets[result.index].data);
          
        }
      });
    },
    // Funktion zur Aktualisierung der Diagramm-Labels
    updateChartLabels(results) {
      // Verwende die Labels des ersten Unternehmens für die X-Achse
      this.chartData.labels = results[0].sortedEntries.map(([date]) => date);
    },
    // Funktion zur Aktualisierung des Diagramms
    updateChart() {
      // Verwende $nextTick, um sicherzustellen, dass die DOM-Änderungen vor dem Update verarbeitet werden
      this.$nextTick(() => {
        if (this.$refs.chart && this.$refs.chart.chart) {
          this.$refs.chart.chart.update(); // Aktualisiere das Diagramm
        }
      });
    },
  },
  // Lifecycle-Hook: Wird nach dem Einfügen der Komponente in den DOM aufgerufen
  mounted() {
    this.fetchData(); // Rufe die Funktion zum Abrufen und Verarbeiten der Daten auf
  },
};
</script>

<style scoped>
.line-chart {
  width: 480px; /* Breite des Diagramms */
  height: 270px; /* Höhe des Diagramms */
  margin-top: 48px; /* Abstand zum oberen Rand */
}
</style>
