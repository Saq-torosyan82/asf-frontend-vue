<template>
  <div>
    <div
      class="credit-criteria component-no-padding"
      :class="expand ? 'expanded' : ''"
    >
      <div class="ribbon"></div>
      <div class="criteria-header inline" @click="toggleExpand()">
        <h1>Credit criteria 1</h1>
        <Icon name="arrow-down" />
      </div>
      <div class="criteria-body" v-show="expand">
        <label>Deal type</label>
        <p>Endorsement deal</p>
        <b-row>
          <b-col>
            <label>Region</label>
            <p>UK</p>
          </b-col>
          <b-col>
            <label>Currency</label>
            <p>GBP</p>
          </b-col>
        </b-row>
        <label>Sport</label>
        <p>Football</p>
        <b-row>
          <b-col>
            <label>Min. amount</label>
            <p>5-10m</p>
          </b-col>
          <b-col>
            <label>Max. amount</label>
            <p>20m</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label>Min. tenor</label>
            <p>6 months</p>
          </b-col>
          <b-col>
            <label>Max. tenor</label>
            <p>2 years</p>
          </b-col>
        </b-row>
        <label>Min SportsFi credit rating</label>
        <p>3.3</p>
        <b-row>
          <b-col>
            <label>Min. interest range</label>
            <p>3</p>
          </b-col>
          <b-col>
            <label>Interest rate range</label>
            <p>3-5</p>
          </b-col>
        </b-row>
        <a href="#" class="link-text"><Icon name="edit" />Edit</a>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon';
export default {
  props: {
    id: {
      type: Number,
      require: true,
    },
    expand: {
      type: Boolean,
      require: true,
    },
  },
  components: {
    Icon,
  },
  data() {
    return {};
  },
  methods: {
    toggleExpand() {
      this.$emit('expanded', this.id);
    },
  },
};
</script>

<style scoped>
.ribbon {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 16px;
  background-color: #b6daff;
  border-radius: 8px 0 0 8px;
}
.credit-criteria {
  margin-bottom: 15px;
  position: relative;
}

.criteria-header {
  cursor: pointer;
  justify-content: space-between;
  width: 100%;
  padding: 20px 15px 20px 28px;
}
.criteria-header h1 {
  font-size: 14px;
  font-weight: 700;
  margin: 0;
}
.criteria-header svg {
  margin-top: 2px;
}
.criteria-body {
  padding: 0px 15px 20px 28px;
}
.credit-criteria label {
  font-size: 10px;
  color: #93a0ae;
}
.credit-criteria p {
  font-size: 12px;
  margin-bottom: 10px;
}
</style>
