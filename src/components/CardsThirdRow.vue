<template>
    <div class="thirdRowContainer">
        <BaseCard class="left-baseCard">
            <h2>Net Income TTM</h2>
            <p>Tabelle</p>
        </BaseCard>
        <BaseCard class="middle-baseCard">
            <h2>Gross Margin in % LQ</h2>
            <p>Tabelle</p>
        </BaseCard>
        <BaseCard class="right-baseCard">
            <h2>Revenue Growth in % YoY</h2>
            <p>Tabelle</p>
        </BaseCard>
    </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue'

export default {
    name: 'CardsThirdRow',
    components: {
        BaseCard
    }
}
</script>

<style>
.thirdRowContainer {
    display: flex;
    width: 100%;
    max-width: 1440px;
    gap: 24px;
    height: 240px;

    .left-baseCard {
        width: 35%;
    }

    .middle-baseCard {
        width: 30%;
    }

    .right-baseCard {
        width: 40%;
    }
}
</style>