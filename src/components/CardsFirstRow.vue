<template>
    <div class="firstRowContainer">
        <div ref="firstRowContainer" class="innerContainer">
            <BaseCard v-for="(item, index) in cards" :key="index" class="firstRow-baseCard">
                <div class="companyLogo-name">
                    <img class="companyLogo" :src="getLogoSrc(item.logo)" alt="Company Logo">
                    <h2>{{ item.name }}</h2>
                </div>
                <p class="fz12">Revenue {{ item.dateQuarter }}</p>
                <div class="revenue-container">
                    <h3>{{ item.revenue }}</h3>
                    <div class="revenue-changes">
                        <div class="revenueDifferenceValue">
                            <p :style="{ color: item.revenueDifference > 0 ? 'green' : 'red' }">
                                {{ item.revenueDifference }}
                            </p>

                            <img v-if="item.revenueDifference > 0" src="@/assets/arrowUp.png" alt="Arrow Up" />
                            <img v-else src="@/assets/arrowDown.png" alt="Arrow Down" />
                        </div>


                        <p :style="{ color: item.revenueDifferencePercent > 0 ? 'green' : 'red' }">
                            {{ item.revenueDifferencePercent }} %
                        </p>
                    </div>

                </div>
                <p style="font-size: 8px">{{ item.currency }}</p>
            </BaseCard>
        </div>
        <img class="arrowRight arrow" src="../assets/arrowRightBlue.png" alt="Scroll Right" @click="scrollRight" />
        <img class="arrowLeft arrow" src="../assets/arrowRightBlue.png" alt="Scroll Left" @click="scrollLeft" />
    </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue'

export default {
    name: 'CardsFirstRow',
    components: {
        BaseCard
    },
    data() {
        return {
            cards: [
                {
                    name: 'Apple',
                    logo: 'apple.png', // Füge hier die tatsächliche URL des Logos ein
                    dateQuarter: 'Q1 2024',
                    revenue: 12.35, // Beispielwert in Milliarden USD
                    revenueDifference: 2.35, // Beispielwert in Milliarden USD
                    revenueDifferencePercent: 23.45, // Beispielwert in Prozent
                    currency: 'in Bill USD'
                },
                {
                    name: 'Meta',
                    logo: 'meta.png', // Füge hier die tatsächliche URL des Logos ein
                    dateQuarter: 'Q1 2024',
                    revenue: 9.88, // Beispielwert in Milliarden USD
                    revenueDifference: -0.12, // Beispielwert in Milliarden USD
                    revenueDifferencePercent: -1.23, // Beispielwert in Prozent
                    currency: 'in Bill USD'
                },
                {
                    name: 'Microsoft',
                    logo: 'microsoft.png', // Füge hier die tatsächliche URL des Logos ein
                    dateQuarter: 'Q1 2024',
                    revenue: 15.00, // Beispielwert in Milliarden USD
                    revenueDifference: 1.50, // Beispielwert in Milliarden USD
                    revenueDifferencePercent: 10.00, // Beispielwert in Prozent
                    currency: 'in Bill USD'
                },
                {
                    name: 'Google',
                    logo: 'google.png',
                    dateQuarter: 'Q1 2024',
                    revenue: 12.00, // Beispielwert in Milliarden USD
                    revenueDifference: 0.80, // Beispielwert in Milliarden USD
                    revenueDifferencePercent: 7.14, // Beispielwert in Prozent
                    currency: 'in Bill USD'
                },
                {
                    name: 'Amazon',
                    logo: 'amazon.png', // Füge hier die tatsächliche URL des Logos ein
                    dateQuarter: 'Q1 2024',
                    revenue: 13.50, // Beispielwert in Milliarden USD
                    revenueDifference: 0.50, // Beispielwert in Milliarden USD
                    revenueDifferencePercent: 3.85, // Beispielwert in Prozent
                    currency: 'in Bill USD'
                },
                {
                    name: 'Tesla',
                    logo: 'tesla.png', // Füge hier die tatsächliche URL des Logos ein
                    dateQuarter: 'Q1 2024',
                    revenue: 8.00, // Beispielwert in Milliarden USD
                    revenueDifference: 0.30, // Beispielwert in Milliarden USD
                    revenueDifferencePercent: 3.85, // Beispielwert in Prozent
                    currency: 'in Bill USD'
                },
                {
                    name: 'Nvidia',
                    logo: 'nvidia.png', // Füge hier die tatsächliche URL des Logos ein
                    dateQuarter: 'Q1 2024',
                    revenue: 7.00, // Beispielwert in Milliarden USD
                    revenueDifference: 1.00, // Beispielwert in Milliarden USD
                    revenueDifferencePercent: 16.67, // Beispielwert in Prozent
                    currency: 'in Bill USD'
                }
            ]
        }
    },
    methods: {
        scrollRight() {
            const container = this.$refs.firstRowContainer; // Zugriff auf das referenzierte Element
            if (container) {
                container.scrollBy({ left: 400, behavior: 'smooth' }); // Scrollt 200px nach rechts
            }
        },
        scrollLeft() {
            const container = this.$refs.firstRowContainer; // Zugriff auf das referenzierte Element
            if (container) {
                container.scrollBy({ left: -400, behavior: 'smooth' }); // Scrollt 200px nach links
            }
        },
        getLogoSrc(logoName) {
            try {
                return require(`@/assets/${logoName}`);
            } catch (e) {
                return ''; // Rückgabe eines leeren Strings, wenn das Bild nicht gefunden wird
            }
        }
    }
}
</script>

<style scoped>
.firstRowContainer {
    width: 100%;
    max-width: 1440px;
    height: 191px;
    background: #023A6233;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}


.innerContainer {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    margin-left: 24px;
    overflow-x: hidden;
    border-radius: 20px;
}

.firstRow-baseCard {
    width: 173px;
    height: 143px;
    flex-shrink: 0;
    margin-right: 24px;

    p {
        margin: 0;
    }
}

.companyLogo-name {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    h2 {
        margin: 0;
        font-size: 20px
    }
}

.revenue-container {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-top: 8px;
    margin-bottom: 8px;

    h3 {
        margin: 0;
        font-size: 24px;
    }

    p {
        margin: 0;
        font-size: 12px;
    }
}

.revenueDifferenceValue {
    display: flex;
    gap: 8px;
    align-items: center;

    img {
        height: 9px;
    }
}

.arrow {
    position: absolute;
    top: calc(50% -16px);
    height: 32px;
    width: 32px;
    z-index: 10;

    &:hover {
        cursor: pointer;
    }
}

.arrowRight {
    right: -16px;
}

.arrowLeft {
    left: -16px;
    transform: rotate(180deg);
}

.fz12 {
    font-size: 12px;
}

.companyLogo {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}

@media (min-width: 1600px) {
    .arrow {
        display: none;
    }
}
</style>
