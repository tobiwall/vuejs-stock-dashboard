<template>
    <div class="secondRowContainer">
        <BaseCard class="left-baseCard">
            <h2>Revenue last 3 years</h2>
            <div class="diagramm">
                <RevenueLineChart></RevenueLineChart>
                <div class="legend-container">
                    <div v-for="(label, index) in chartLabels" :key="index" class="legend-item">
                        <div :style="{ backgroundColor: chartColors[index], borderColor: white }"
                            class="legend-box"></div>
                        <div class="legend-text">{{ label }} {{ chartData.datasets[0].data[index] }}</div>
                    </div>
                </div>
            </div>
        </BaseCard>
        <BaseCard class="right-baseCard">
            <h2>Revenue Breakdown Magnificent Seven</h2>
            <div class="diagramm">
                <RevenuePieChart></RevenuePieChart>
                <div class="legend-container">
                    <div v-for="(label, index) in chartLabels" :key="index" class="legend-item">
                        <div :style="{ backgroundColor: chartColors[index], borderColor: white }"
                            class="legend-box"></div>
                        <div class="legend-text">{{ label }} {{ chartData.datasets[0].data[index] }}</div>
                    </div>
                </div>
            </div>
        </BaseCard>
    </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue'
import RevenuePieChart from '../components/RevenuePieChart.vue'
import RevenueLineChart from '../components/RevenueLineChart.vue'

export default {
    name: 'CardsSecondRow',
    components: {
        BaseCard,
        RevenuePieChart,
        RevenueLineChart
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
                '#093A52'
            ],
            chartData: {
                datasets: [{
                    data: [100, 85, 90, 110, 95, 80, 105] // Beispielwerte
                }]
            }
        }
    }
}
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
    width: 60%;
  }
  
  .right-baseCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
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