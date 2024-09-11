<template>
  <div class="pie-chart">
    <!-- Diagrammkomponente für die Darstellung des Doughnut-Diagramms -->
    <Doughnut ref="chart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'; // Importiere die Doughnut-Komponente von vue-chartjs
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'; // Importiere notwendige Komponenten von Chart.js
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importiere Chart.js-Plugin für Datenlabels
import { getSortedStockData } from '@/services/stockService'; // Importiere die Funktion zum Abrufen von Aktienmarktdaten

// Registriere notwendige Chart.js-Komponenten und Plugins
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

export default {
  name: 'RevenuePieChart', // Name der Komponente
  components: {
    Doughnut, // Registriere die Doughnut-Komponente
  },
  data() {
    return {
      chartData: this.initializeChartData(), // Initialisiere die Daten für das Diagramm
      chartOptions: this.initializeChartOptions(), // Initialisiere die Optionen für das Diagramm
      latestDates: [], // Halte die neuesten Daten für jedes Unternehmen
    };
  },
  methods: {
    // Initialisiere die Datenstruktur des Diagramms
    initializeChartData() {
      return {
        labels: ['Apple', 'Meta', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Nvidia'],
        datasets: [{
          label: 'Revenue (in Billion USD)',
          data: [100, 85, 90, 110, 95, 80, 105], // Placeholder-Werte
          backgroundColor: ['#39DAFF', '#31BFE2', '#29A5C5', '#218AA8', '#196F8C', '#11546F', '#093A52'],
          borderColor: '#fff',
          borderWidth: 1,
        }],
      };
    },
    // Initialisiere die Optionen für das Diagramm
    initializeChartOptions() {
      return {
        responsive: true,
        cutout: '60%',
        plugins: {
          legend: {
            display: false, // Verberge die Legende
          },
          tooltip: {
            // Konfiguriere den Tooltip
            callbacks: {
              label: (tooltipItem) => {
                const companyIndex = tooltipItem.dataIndex;
                const latestDate = this.latestDates[companyIndex];
                return `$${tooltipItem.raw.toFixed(1)} Billion ${latestDate}`; // Format für den Tooltip-Text
              },
            },
          },
          datalabels: {
            display: false, // Verhindere die Anzeige von Datenlabels im Diagramm
          },
        },
      };
    },
    // Hauptfunktion zum Abrufen und Verarbeiten von Daten
    async fetchData() {
      const { companySheetMap, initialDataIndexMap } = this.getCompanyDataConfig(); // Hole die Konfiguration für die Daten

      try {
        const dataPromises = this.createDataPromises(companySheetMap, initialDataIndexMap); // Erstelle Promises für den Datenabruf
        const results = await Promise.all(dataPromises); // Warte auf die Auflösung aller Promises
        this.processFetchedData(results); // Verarbeite die abgerufenen Daten und aktualisiere das Diagramm
      } catch (error) {
        console.error('Failed to load data:', error); // Fehlerbehandlung
      }
    },
    // Funktion zur Konfiguration der Unternehmen und ihrer Datenindizes
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
    // Funktion zum Erstellen der Promises für den Datenabruf
    createDataPromises(companySheetMap, initialDataIndexMap) {
      return this.chartData.labels.map((company, index) => {
        const sheetName = companySheetMap[company]; // Tabellenblattname für das Unternehmen
        const rowIndex = initialDataIndexMap[company]; // Anfangsindex für die Daten des Unternehmens
        return getSortedStockData(sheetName, rowIndex).then(data => ({
          company,
          index,
          sum: this.calculateSumOfLastFour(data.sortedEntries), // Berechne die Summe der letzten vier Quartale
          latestDate: data.latestDate, // Speichere das neueste Datum
        }));
      });
    },
    // Funktion zur Verarbeitung der abgerufenen Daten
    processFetchedData(results) {
      const newData = Array(this.chartData.labels.length).fill(0); // Initialisiere neues Datenarray
      this.latestDates = Array(this.chartData.labels.length).fill(''); // Initialisiere neueste Daten-Array

      results.forEach(result => {
        if (result.index !== -1) {
          newData[result.index] = result.sum; // Setze die Summenwerte
          this.latestDates[result.index] = result.latestDate; // Setze die neuesten Datenwerte
        }
      });

      this.updateChartData(newData); // Aktualisiere die Daten im Diagramm
      this.updateChart(); // Aktualisiere das Diagramm
    },
    // Funktion zur Berechnung der Summe der letzten vier Quartale
    calculateSumOfLastFour(data) {
      if (!Array.isArray(data)) {
        console.error('Expected an array but got:', data); // Fehlerbehandlung, falls Daten kein Array sind
        return 0; // Rückgabe 0, wenn das Datenformat nicht stimmt
      }
      if (data.length < 4) {
        console.error('Not enough data to calculate the sum of the last four entries.'); // Fehlerbehandlung, falls nicht genug Daten vorhanden sind
        return 0; // Rückgabe 0, wenn nicht genug Daten vorhanden sind
      }
      const lastFourEntries = data.slice(-4); // Holen Sie die letzten vier Einträge
      const sum = lastFourEntries.reduce((acc, [, value]) => {
        const numericValue = parseFloat(value.replace(',', '.')); // Parse den String in eine Zahl
        return acc + (isNaN(numericValue) ? 0 : numericValue); // Addiere nur gültige Zahlen
      }, 0);
      return sum; // Gib die berechnete Summe zurück
    },
    // Funktion zur Aktualisierung der Diagrammdaten
    updateChartData(newData) {
      this.chartData = {
        ...this.chartData,
        datasets: [{
          ...this.chartData.datasets[0],
          data: [...newData], // Setze die neuen Daten
        }],
      };
    },
    // Funktion zur Aktualisierung des Diagramms
    updateChart() {
      this.$nextTick(() => {
        if (this.$refs.chart && this.$refs.chart.chart) {
          this.$refs.chart.chart.update(); // Aktualisiere das Diagramm
        }
      });
      this.$emit('chartDataUpdated', this.chartData); // Sende ein Ereignis nach der Aktualisierung
    },
  },
  // Lifecycle-Hook: Wird nach dem Einfügen der Komponente in den DOM aufgerufen
  mounted() {
    this.fetchData(); // Rufe die Funktion zum Abrufen und Verarbeiten der Daten auf
  },
};
</script>

<style scoped>
.pie-chart {
  width: 480px; /* Breite des Diagramms */
  height: 270px; /* Höhe des Diagramms */
  margin-top: 48px; /* Abstand zum oberen Rand */
}
</style>
