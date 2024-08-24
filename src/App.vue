<template>
  <div class="bookmark-header"></div>
  <h1>The Magnificent Seven Companies</h1>

  <div class="firstRowContainer">
    <BaseCard v-for="(item, index) in cards" :key="index" class="firstRow-baseCard">
      <div class="companyLogo-name">
        <img src="" alt="">
        <h2>{{ item.name }}</h2>
      </div>
      <p>Revenue {{ item.dateQuarter }}</p>
      <div class="revenue-container">
        <h3>{{ item.revenue }}</h3>
        <div class="revenue-changes">
          <p>{{ item.revenueDifference }}</p>
          <p>{{ item.revenueDifferencePercent }} %</p>
        </div>
      </div>
      <p>{{ item.currency }}</p>
    </BaseCard>
  </div>

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

export default {
  name: 'App',
  components: {
    BaseCard
  },
  data() {
    return {
      cards: [
        {
          name: 'Apple',
          logo: '', // Füge hier die tatsächliche URL des Logos ein
          dateQuarter: 'Q1 2024',
          revenue: 12.35, // Beispielwert in Milliarden USD
          revenueDifference: 2.35, // Beispielwert in Milliarden USD
          revenueDifferencePercent: 23.45, // Beispielwert in Prozent
          currency: 'in Bill USD'
        },
        {
          name: 'Meta',
          logo: '', // Füge hier die tatsächliche URL des Logos ein
          dateQuarter: 'Q1 2024',
          revenue: 9.88, // Beispielwert in Milliarden USD
          revenueDifference: -0.12, // Beispielwert in Milliarden USD
          revenueDifferencePercent: -1.23, // Beispielwert in Prozent
          currency: 'in Bill USD'
        },
        {
          name: 'Microsoft',
          logo: '', // Füge hier die tatsächliche URL des Logos ein
          dateQuarter: 'Q1 2024',
          revenue: 15.00, // Beispielwert in Milliarden USD
          revenueDifference: 1.50, // Beispielwert in Milliarden USD
          revenueDifferencePercent: 10.00, // Beispielwert in Prozent
          currency: 'in Bill USD'
        },
        {
          name: 'Google',
          logo: '', // Füge hier die tatsächliche URL des Logos ein
          dateQuarter: 'Q1 2024',
          revenue: 12.00, // Beispielwert in Milliarden USD
          revenueDifference: 0.80, // Beispielwert in Milliarden USD
          revenueDifferencePercent: 7.14, // Beispielwert in Prozent
          currency: 'in Bill USD'
        },
        {
          name: 'Amazon',
          logo: '', // Füge hier die tatsächliche URL des Logos ein
          dateQuarter: 'Q1 2024',
          revenue: 13.50, // Beispielwert in Milliarden USD
          revenueDifference: 0.50, // Beispielwert in Milliarden USD
          revenueDifferencePercent: 3.85, // Beispielwert in Prozent
          currency: 'in Bill USD'
        },
        {
          name: 'Tesla',
          logo: '', // Füge hier die tatsächliche URL des Logos ein
          dateQuarter: 'Q1 2024',
          revenue: 8.00, // Beispielwert in Milliarden USD
          revenueDifference: 0.30, // Beispielwert in Milliarden USD
          revenueDifferencePercent: 3.85, // Beispielwert in Prozent
          currency: 'in Bill USD'
        },
        {
          name: 'Nvidia',
          logo: '', // Füge hier die tatsächliche URL des Logos ein
          dateQuarter: 'Q1 2024',
          revenue: 7.00, // Beispielwert in Milliarden USD
          revenueDifference: 1.00, // Beispielwert in Milliarden USD
          revenueDifferencePercent: 16.67, // Beispielwert in Prozent
          currency: 'in Bill USD'
        }
      ]
    }
  }

}
</script>

<style>
body {
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 64px 96px 96px 96px;
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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

.firstRowContainer {
  max-width: 100%;
  height: 191px;
  margin-bottom: 32px;
  background: #023A6233;
  border-radius: 20px;
  display: flex;
  gap: 24px;
  padding: 24px;
  overflow: hidden;
}

.firstRow-baseCard {
  width: 173px;
  height: 143px;
  flex-shrink: 0;

  p {
    margin: 0;
  }
}

.companyLogo-name {
  display: flex;

  h2 {
    margin: 0;
  }
}

.revenue-container {
  display: flex;
  align-items: center;
  gap: 48px;
  margin-top: 8px;
  margin-bottom: 8px;

  h3 {
    margin: 0;
  }

  p {
    margin: 0;
  }
}

.secondRowContainer {
  display: flex;
  margin-bottom: 24px;
  width: 100%;
  gap: 24px;
  height: 280px;

  .left-baseCard {
    width: 60%;
  }
}

.thirdRowContainer {
  display: flex;
  width: 100%;
  gap: 24px;
  height: 240px;

  .left-baseCard {
    width: 35%;
  }

  .middle-baseCard {
    width: 30%;
  }

  .left-baseCard {
    width: 40%;
  }
}
</style>
