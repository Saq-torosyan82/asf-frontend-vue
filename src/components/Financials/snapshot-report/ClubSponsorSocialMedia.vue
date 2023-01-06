<template>
  <div class="sponsors-social-content">
    <div class="tb-social-media" v-if="Object.keys(socialMedia).length">
      <table class="tb-blue">
        <thead>
        <tr>
          <td>{{socialMedia.label}}</td>
          <td>Followers</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in socialMedia.items" :key="index">
          <td>{{item.label}}</td>
          <td>{{item.value}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="tb-club-sponsors" v-if="Object.keys(sponsors).length">
      <table class="tb-blue">
        <thead>
        <tr>
          <td colspan="2">{{sponsors.label}}</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in sponsors.items" :key="index">
          <td>{{item.label}}</td>
          <td>{{item.value.join(', ')}}</td>
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
  props: {
    sponsors: {
      type: Object,
      default: new Object(),
    },
    socialMedia: {
      type: Object,
      default: new Object(),
    },
  },
};
</script>
