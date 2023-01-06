<template>
  <div class="club-positions-content">
    <div class="tb-club-honours" v-if="Object.keys(clubHonours).length">
      <table class="tb-green">
        <thead>
        <tr>
          <td :colspan="honoursCount"> {{clubHonours.label}}</td>
        </tr>
        </thead>
        <tbody>
        <tr v-if="clubHonours.items.length > 0">
          <td v-for="(item, index) in clubHonours.items" :key="index">
            <template v-if="Array.isArray(item)">
              <img  v-for="(image, key) in item" :src="image" :key="key" alt="">
            </template>
            <template v-else>
              <img  :src="item" alt="">
            </template>
          </td>
        </tr>
        <tr :class="clubHonours.items.length <= 0 && 'default-row'">
          <td v-for="(i, index) in honoursCount" :key="index"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="tb-league tb-blue" v-if="Object.keys(leaguesList).length">
      <table>
        <thead>
        <tr>
          <td></td>
          <td v-for="col in leaguesListCol" :key="col">
            {{ col }}
          </td>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(item, index) in leaguesList.items"
            :key="index"
        >
          <td>{{ item.label }}</td>
          <td v-for="(value, index) in item.value" :key="index">
            {{ value }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      honoursCount: 0
    }
  },
  props: {
    clubHonours: {
      type: Object,
      default: new Object(),
    },
    leaguesList: {
      type: Object,
      default: new Object(),
    },
    leaguesListCol: {
      type: Array,
      default: new Array(),
    },
    forPrint: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    arrayReverse() {
      if (!this.forPrint) {
        let len = this.leaguesList.items.length;
        for (let i = 0; i < len; i++) {
          this.leaguesList.items[i].value = this.leaguesList.items[i].value.reverse();
        }
      }
    },
  },
  mounted() {
    this.honoursCount = this.clubHonours.items.length > 0 ? this.clubHonours.items.length : this.leaguesList.items.length - 1;
    this.arrayReverse();
  },
  watch: {
    clubHonours() {
      this.honoursCount = this.clubHonours.items.length;
    },
    leaguesList() {
      this.arrayReverse()
    }
  },
};
</script>
