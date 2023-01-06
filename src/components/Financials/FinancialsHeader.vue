<template>
  <div class="financials-header">
    <img v-if="avatar" v-auth-image="avatar" alt="" />
    <img v-else src="@/assets/img/person-default.png" alt="" />
    <div class="user-information">
      <h5>{{ clubName }}</h5>
      <p>{{ title }}</p>
    </div>
    <CurrencySelect class="currency-select" />
    <router-link class="view-reports-button" to="snapshot-report">
      <Icon name="view-reports" />
      View reports
    </router-link>
  </div>
</template>

<script>
import store from '@/store';
import Icon from '@/components/Icon';
import CurrencySelect from '@/components/Financials/CurrencySelect';
export default {
  components: {
    Icon,
    CurrencySelect,
  },
  computed: {
    clubName() {
      return store.getters['Financials/getClubName'];
    },
    title() {
      return store.getters['Financials/getTitle'];
    },
    avatar() {
      return store.getters['Financials/getAvatar'];
    },
  },
};
</script>

<style scoped>
.financials-header {
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 110px;
  padding: 25px 40px;
  border-radius: 10px;
  background-color: #ffffff;
}
.financials-header img {
  width: 56px;
  height: 56px;
}
.financials-header .user-information {
  margin-left: 20px;
}
.financials-header .user-information h5 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
}
.financials-header .user-information p {
  font-size: 14px;
  color: #707d8c;
  margin: 0;
}
.currency-select {
  margin: 0 24px 0 auto;
}
.view-reports-button {
  display: inline-flex;
  align-items: center;
  padding: 9px 20px;
  border-radius: 4px;
  background-color: #3a9eba;
  color: white;
  font-size: 14px;
  font-weight: 700;
  gap: 7px;
}
</style>
