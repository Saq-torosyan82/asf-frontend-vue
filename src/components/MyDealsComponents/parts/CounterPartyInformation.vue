<template>
  <div v-if="contactData !== '' && contactData.length > 0" class="counter-party">
    <hr>
    <h5 class="component-header">Counterparty information</h5>
    <p>Contact info</p>
    <div v-for="(data, key) in contactData" :key="key" class="deal-info-small">
      <div class="top">
        <p>
          First name:
          <span>{{ data.firstName }}</span>
        </p>
        <p>
          Last name:
          <span>{{ data.lastName }}</span>
        </p>
        <p>
          Position:
          <span>{{ data.position }}</span>
        </p>
      </div>

      <hr />
      <div class="bottom">
        <p>
          Phone number:
          <span>{{ data.phone }}</span>
        </p>
        <p>
          Contact email:
          <span>{{ data.email }}</span>
        </p>
        <p></p>
      </div>
    </div>

  </div>
</template>

<script>

import store from "@/store"
export default {
  name: "CounterPartyInformation",
  computed: {
    contactData() {
      return store.getters['dealDetail/getContactData'];
    }
  }
}
</script>

<style scoped>


.deal-info-small {
  background: #f3f7fc;
  border-radius: 8px;
  padding: 10px 15px;
  margin: 4px 0 16px;
}
.deal-info-small .top,
.deal-info-small .bottom {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
}
.deal-info-small p {
  min-width: 100px;
  width: 33.3%;
  margin-bottom: 0;
  font-size: 10px;
  font-weight: 700;
  color: #253242;
}
.deal-info-small p span {
  margin-left: 7px;
  font-weight: 500;
}
.deal-info-small hr {
  color: #d9dfe5;
  height: 1px;
  opacity: 1;
  margin: 10px 0;
}

</style>