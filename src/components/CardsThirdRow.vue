<template>
    <div class="thirdRowContainer">
        <BaseCard class="left-baseCard">
            <h2>Net Income TTM</h2>
            <ChartNetIncome></ChartNetIncome>
        </BaseCard>
        <BaseCard class="middle-baseCard">
            <h2>Gross Margin in % LQ</h2>
            <ChartGrossMargin></ChartGrossMargin>
        </BaseCard>
        <BaseCard class="right-baseCard">
            <h2>Revenue Growth in % YoY</h2>
            <ChartRevenueGrowth></ChartRevenueGrowth>
        </BaseCard>
    </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue'
import ChartNetIncome from '../components/ChartNetIncome.vue'
import ChartGrossMargin from '../components/ChartGrossMargin.vue'
import ChartRevenueGrowth from '../components/ChartRevenueGrowth.vue'

export default {
    name: 'CardsThirdRow',
    components: {
        BaseCard,
        ChartNetIncome,
        ChartGrossMargin,
        ChartRevenueGrowth
    }
}
</script>

<style>

h2 {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 8px;
}

.thirdRowContainer {
    display: flex;
    width: 100%;
    max-width: 1440px;
    gap: 24px;
    height: 300px;

    .left-baseCard {
        width: 34%;
    }

    .middle-baseCard {
        width: 25%;
    }

    .right-baseCard {
        width: 41%;
    }
}
</style>