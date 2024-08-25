<template>
  <div class="bookmark-header"></div>
  <div class="df-jstart"><h1>The Magnificent Seven Companies</h1></div>

  <CardsFirstRow></CardsFirstRow>
  

  <div class="secondRowContainer">
    <BaseCard class="left-baseCard">
      <h2>Revenue last 3 years</h2>
      <p>Hier ist etwas mehr Inhalt für eine andere Karte.</p>
    </BaseCard>
    <BaseCard class="right-baseCard">
      <h2>Revenue Breakdown Magnificent Seven</h2>
      <p>Hier ist etwas mehr Inhalt für eine andere Karte.</p>
    </BaseCard>
  </div>
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
import BaseCard from './components/BaseCard.vue'
import CardsFirstRow from './components/CardsFirstRow.vue'

export default {
  name: 'App',
  components: {
    BaseCard,
    CardsFirstRow
  }

}
</script>

<style>
body {
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 64px 80px 80px 96px;
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
  color: white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.df-jstart {
  width: 100%;
  max-width: 1440px;
  display: flex;
  justify-content: flex-start;
}

h1 {
  color: white;
  margin-top: 0;
  margin-left: 24px;
  font-size: 36px;
}

.bookmark-header {
  width: 96px;
  height: 32px;
  position: absolute;
  left: 0;
  top: 70px;
  background: #39DAFF;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.secondRowContainer {
  display: flex;
  margin-bottom: 24px;
  width: 100%;
  max-width: 1440px;
  gap: 24px;
  height: 280px;

  .left-baseCard {
    width: 60%;
  }

  .right-baseCard {
    width: 40%;
  }
}

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
