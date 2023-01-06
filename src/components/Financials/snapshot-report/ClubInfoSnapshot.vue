<template>
  <div class="club-list-content">
    <div class="logo-area dp-row">
      {{clubName}}
      <img :src="clubLogo" class="club-logo" />
    </div>
    <div class="tb-club-info" v-if="clubList.length">
      <table class="tb-green">
        <tbody>
          <tr v-for="(item, index) in clubList" :key="index">
            <td>{{ item.label }}</td>
            <td v-if="item.label === website"><a :href="item.value">{{ item.value || '--' }}</a></td>
            <td v-else>{{ item.value || '--' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tb-squad-info" v-if="squadInfo.length">
      <table class="tb-green">
        <tbody>
        <tr v-for="(item, index) in squadInfo" :key="index" :class="item.style">
          <td>{{ item.label }}</td>
          <td>{{ item.value || '--' }}</td>
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
      website: 'Website',
      manager: 'Manager',
    }
  },
  props: {
    clubList: {
      type: Array,
      default: new Array(),
    },
    squadInfo: {
      type: Array,
      default: new Array(),
    },
    clubLogo: {
      type: String,
      default: new String(),
    },
    clubName: {
      type: String,
      default: new String(),
    },
  },
  methods: {
  },
};
</script>
