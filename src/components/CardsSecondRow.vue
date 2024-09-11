<template>
  <div class="secondRowContainer">
    <BaseCard class="left-baseCard">
      <h2>Revenue last 3 years</h2>
      <div class="diagramm">
        <RevenueLineChart></RevenueLineChart>
        <div class="legend-container">
          <div v-for="(label, index) in chartLabels" :key="index" class="legend-item">
            <div :style="{ backgroundColor: chartColors[index], borderColor: 'white' }" class="legend-box"></div>
            <!-- Sicherstellen, dass chartData existiert -->
            <div class="legend-text">{{ label }} {{ chartData?.datasets?.[0]?.data?.[index] ?? 0 }}</div>
          </div>
        </div>
      </div>
    </BaseCard>
    <BaseCard class="right-baseCard">
      <h2>Revenue Breakdown Magnificent Seven</h2>
      <div class="diagramm">
        <!-- Direktes Binden der Daten als Prop an die Legende -->
        <RevenuePieChart ref="pieChart" @chartDataUpdated="updateLegend"></RevenuePieChart>
        <div class="legend-container">
          <div v-for="(label, index) in chartLabels" :key="index" class="legend-item">
            <div :style="{ backgroundColor: chartColors[index], borderColor: 'white' }" class="legend-box"></div>
            <!-- Daten aus legendValues anzeigen -->
            <div class="legend-text">{{ label }} {{ legendValues[index] }}</div>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue';
import RevenuePieChart from '../components/RevenuePieChart.vue';
import RevenueLineChart from '../components/RevenueLineChart.vue';

export default {
  name: 'CardsSecondRow',
  components: {
    BaseCard,
    RevenuePieChart,
    RevenueLineChart,
  },
  data() {
    return {
      chartLabels: ['Apple', 'Meta', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Nvidia'],
      chartColors: [
        '#39DAFF',
        '#31BFE2',
        '#29A5C5',
        '#218AA8',
        '#196F8C',
        '#11546F',
        '#093A52',
      ],
      legendValues: Array(7).fill(0), // Default-Werte für Legende initialisieren
    };
  },
  methods: {
    updateLegend(chartData) {
      // Funktion, um die Legendenwerte zu aktualisieren
      if (chartData && chartData.datasets.length > 0) {
        this.legendValues = chartData.datasets[0].data.map((value) => Number(value).toFixed(1));

      } else {
        console.error('Chart data is not available');
      }
    },
  },
};
</script>

<style scoped>
.secondRowContainer {
  display: flex;
  width: 100%;
  max-width: 1440px;
  gap: 24px;
  height: 352px;
}

.left-baseCard {
  flex-grow: 1;
}

.right-baseCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(40% - 12px);
}

h2 {
  font-size: 20px;
  margin-top: 8px;
}

.diagramm {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 260px;
  width: 100%;
}

.legend-container {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pie-chart {
  height: 200px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.legend-box {
  width: 32px;
  height: 12px;
  border: 1px solid white;
  margin-right: 8px;
}

.legend-text {
  font-size: 12px;
  color: white;
}
</style>