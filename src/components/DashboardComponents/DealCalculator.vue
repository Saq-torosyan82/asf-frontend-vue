<template>
  <div class="component deal-calculator">
    <icon name="deal-calculator" class="calculator-icon" />
    <div class="deal-calculator-footer">
      <a href="#" @click.prevent="setDealType(future)" class="butotn-link quote"
        >Get a quote</a
      >
      <a href="#" @click.prevent="setDealType(live)" class="butotn-link deal"
        >Start a Deal</a
      >
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { LIVE, FUTURE } from '@/enums/dealCalculator/DealTypes';
import { EventBus } from '../../main';

export default {
  name: 'DealCalculator',
  computed: {
    live() {
      return LIVE;
    },
    future() {
      return FUTURE;
    },
  },
  methods: {
    setDealType(type) {
      store.dispatch('dealCalculator/resetDeal');
      store.dispatch('dealCalculator/setDealType', type);
      store.dispatch('dealCalculator/hideDealType', true);
      this.$router.push({ path: '/dealcalculator' }).catch(() => true);
    },
  },
};
</script>

<style lang="scss" scoped>
.component.deal-calculator {
  height: 257px;
  /* background: linear-gradient(123.5deg, #3a7fce 0%, #69acf0 100%); */
  text-align: center;
  background: linear-gradient(156.12deg, #369eba -3.55%, #ffffff 84.66%);
  outline: 1px solid rgba(55, 159, 187, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.calculator-icon {
  height: 70px;
  width: auto;
}

.butotn-link {
  display: block;
  color: white;
  font-size: 14px;
  font-weight: 700;
  border-radius: 4px;
  padding: 10px 0;
  background-size: 300%;
  transition: background-position 0.5s ease-in-out;
  &.quote {
    margin-top: 18px;
    background-position: top;
    background-image: linear-gradient(87.86deg, #17afd9 3.22%, #84e2fd 106.73%);
    &:hover {
      background-position: left;
    }
  }
  &.deal {
    margin-top: 10px;
    background-position: bottom;
    background-image: linear-gradient(
      266.6deg,
      #76e150 11.62%,
      #3b9fbb 110.52%
    );
    &:hover {
      background-position: left;
    }
  }
}

/* .component.deal-calculator h4 {
  margin-top: 12px;
  font-size: 14px;
  font-weight: 700;
  color: white;
}
.component.deal-calculator p {
  font-size: 12px;
  font-weight: 600;
  padding: 0 20px;
  color: white;
} */
</style>
