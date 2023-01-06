<template>
  <div>
    <b-row>
      <b-col>
        <div class="text-with-label">
          <a :href="socialMedia.facebook"><icon name="facebook-color" /></a>
        </div>
      </b-col>
      <b-col>
        <div class="text-with-label">
          <a :href="socialMedia.instagram"><icon name="instagram-color" /></a>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <div class="text-with-label">
          <a :href="socialMedia.twitter"><icon name="twitter-color" /></a>
        </div>
      </b-col>
      <b-col>
        <div class="text-with-label">
          <a :href="socialMedia.youtube"><icon name="youtube-color" /></a>
        </div>
      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
  name: "SocialMedia",
  props: ['socialMedia']
}
</script>

<style scoped>

</style>