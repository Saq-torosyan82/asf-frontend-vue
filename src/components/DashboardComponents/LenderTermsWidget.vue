<template>
  <div v-if="data !== ''" class="lender-terms component-no-padding">
    <div class="term-row inline">
      <div class="point"></div>
      <p class="term-info">Number of Terms Issued</p>
      <p class="term-number">{{ data.nb_terms }}</p>
    </div>
    <div class="term-row inline">
      <div class="point"></div>
      <p class="term-info">Number of Deals done</p>
      <p class="term-number">{{ data.nb_live_deals }}</p>
    </div>
    <div class="term-row inline">
      <div class="point"></div>
      <p class="term-info">Success Rate</p>
      <p class="term-number">{{ data.success_rate }}%</p>
    </div>
  </div>
</template>

<script>
import RepositoryFactory from '@/repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'LenderTermsWidget',
  data() {
    return {
      data: '',
    };
  },
  mounted() {
    this.getSuccessRate();
  },
  methods: {
    getSuccessRate() {
      let $this = this;
      $this.$loading(true);
      UserRepository.getSuccessRate()
        .then((response) => {
          $this.data = response.data;
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.lender-terms {
  background: var(--main-gradient);
  padding: 24px 20px;
  height: 140px;
  .term-row {
    margin-bottom: 10px;
    width: 100%;
    align-items: center;
    &:last-of-type {
      margin-bottom: 0;
    }
    p {
      color: white;
      font-size: 14px;
      font-weight: 600;
      margin: 0;
    }

    .point {
      background-color: white;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      margin-right: 10px;
    }

    .term-number {
      margin-left: auto;
      text-align: right;
      font-weight: bold;
    }
  }
}
</style>
