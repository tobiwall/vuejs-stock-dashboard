<template>
  <div class="bookmark-header"></div>
  <div class="df-jstart"><h1>The Magnificent Seven Companies</h1></div>

  <CardsFirstRow class="cards-first-row"></CardsFirstRow>
  <CardsSecondRow class="cards-second-row"></CardsSecondRow>
  <CardsThirdRow></CardsThirdRow>

  

</template>

<script>
import CardsFirstRow from './components/CardsFirstRow.vue'
import CardsSecondRow from './components/CardsSecondRow.vue'
import CardsThirdRow from './components/CardsThirdRow.vue'

export default {
  name: 'App',
  components: {
    CardsFirstRow,
    CardsSecondRow,
    CardsThirdRow
  }

}
</script>

<style>
body {
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 64px 80px 40px 96px;
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

.cards-first-row {
  margin-bottom: 32px;
}

.cards-second-row {
  margin-bottom: 24px;
}


</style>
