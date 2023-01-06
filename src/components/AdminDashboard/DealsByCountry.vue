<template>
  <div class="country-component">
    <h5 class="component-header-text">Deals by Country</h5>

    <div class="map-wrap">
      <Map
        :countriesKeys="countriesKeys"
        :continentDealsNum="continentDealsNum"
      />
    </div>
    <div class="country-legend">
      <div v-for="(deal, index) in first4Deals" :key="index" class="stat">
        <div class="index">{{ index + 1 }}</div>
        <div class="stat-right">
          <h5 class="country">{{ deal.label }}</h5>
          <p class="deal-count">{{ deal.number }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import DealRepository from '../../repositories/DealCalculator/DealRepository';
const countryByContinentHelpers = createNamespacedHelpers('countryByContinent');
import Map from './Map';
export default {
  name: 'DealsByCountry',
  data() {
    return {
      continentDealsNum: [],
      deals: [],
      countriesKeys: [],
      first4Deals: [],
    };
  },
  created() {
    // this.getDealsDataLive();
    this.getDealsByCountry();
  },
  components: { Map },
  computed: {
    ...countryByContinentHelpers.mapGetters(['fullCountryByContinent']),
  },
  methods: {
    getDealsByCountry() {
      let $this = this;
      $this.$loading(true);
      DealRepository.adminDealsByCountry()
        .then((res) => {
          this.getContinentDeals(res?.data?.data);

          this.first4Deals = res?.data?.data
            ?.sort((a, b) => b.number - a.number)
            .slice(0, 6);
          this.countriesKeys = res?.data?.data?.map((e) => e.key);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },

    getContinentDeals(data) {
      if (data.length !== 0) {
        let tmpData = [];
        data.forEach((e) => {
          tmpData = [
            ...tmpData,
            this.fullCountryByContinent
              .filter((a) => a.country === e.label)
              .map((b) => ({
                label: b.continent,
                number: e.number,
              }))[0],
          ];
        });
        const continentList = [
          'North America',
          'South America',
          'Europe',
          'Asia',
          'Africa',
          'Oceania',
        ];
        let tmpContinentList = {};
        let tmpNum = 0;
        let tmpName = '';
        tmpData
          .sort((a, b) => a.label.localeCompare(b.label))
          .forEach((a) => {
            if (tmpName !== a.label) {
              tmpName = a.label;
              tmpNum = a.number;
            } else {
              tmpNum = tmpNum + a.number;
            }
            tmpContinentList = { ...tmpContinentList, [a.label]: tmpNum };
          });

        this.continentDealsNum = continentList.map((a) => ({
          number: tmpContinentList[a] || 0,
          label: a,
        }));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.country-component {
  height: fit-content;
  min-height: 100%;
  position: relative;
}
.continent-legend {
  display: grid;
  gap: 15px 20px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  width: 100%;
  margin: 30px 10px;
  padding-bottom: 10px;
  // position: absolute;
  // top: 20px;
  .status {
    place-self: start start;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    .index {
      height: 24px;
      min-width: 24px;
      border-radius: 50%;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      color: white;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .status-right {
      // text-align: left;
      display: flex;
      align-items: baseline;
      justify-content: flex-start;
      .continent {
        font-size: 15px;
        font-weight: bold;
        min-width: fit-content;
        display: block;
        margin: 0;
        margin-bottom: -5px;
      }
      .deal-count {
        font-size: 14px;
        margin-left: 5px;
        color: black;
        font-weight: bold;
      }
    }
  }
  .status:nth-of-type(1) .index {
    background-color: #fad61b;
  }
  .status:nth-of-type(2) .index {
    background-color: #76e150;
  }
  .status:nth-of-type(3) .index {
    background-color: #4289da;
  }
  .status:nth-of-type(4) .index {
    background-color: #0d4e9a;
  }
  .status:nth-of-type(5) .index {
    background-color: #0d9a80;
  }
  .status:nth-of-type(6) .index {
    background-color: #9a4e0d;
  }
}
.map-wrap {
  text-align: center;
}

.country-legend {
  margin: 40px 10px 20px;
  display: grid;
  gap: 15px 20px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  width: 100%;
  // position: absolute;
  // bottom: 50px;
  .stat {
    place-self: start start;
    // min-width: 100px;
    display: flex;
    flex-flow: row;
    align-items: center;
    .index {
      height: 24px;
      aspect-ratio: 1;
      border-radius: 50%;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      line-height: 24px;
      color: white;
      margin-right: 10px;
    }
    .stat-right {
      display: flex;
      flex-flow: row;
      align-items: baseline;
    }
  }
}

.country-legend .stat:nth-of-type(1) .index {
  background-color: #fad61b;
}
.country-legend .stat:nth-of-type(2) .index {
  background-color: #76e150;
}
.country-legend .stat:nth-of-type(3) .index {
  background-color: #4289da;
}
.country-legend .stat:nth-of-type(4) .index {
  background-color: #0d4e9a;
}
.country-legend .stat:nth-of-type(5) .index {
  background-color: #0d9a80;
}
.country-legend .stat:nth-of-type(6) .index {
  background-color: #9a4e0d;
}
.country-legend .stat h5.country {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 0;
}
.country-legend .stat p.deal-count {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 0;
  margin-left: 5px;
}
// @media screen and (max-width: ) {
// }
</style>
