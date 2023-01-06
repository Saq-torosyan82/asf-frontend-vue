<template>
  <div>
    <table class="social-followers">
      <tr v-if="socialMedia.facebook && Object.keys(socialMedia.facebook).length > 0">
        <td class="icon">
          <a :href="socialMedia.facebook.link" target="_blank">
            <icon name="facebook-color" />
          </a>
        </td>
        <td class="name">Facebook</td>
        <td>
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              :style="{
                width:
                  (socialMedia.facebook.nb_followers / maxFollowers) * 100 +
                  '%',
              }"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </td>
        <td class="legend">
          {{ socialMedia.facebook.nb_followers | numberOfFollowers }}
        </td>
      </tr>

      <tr v-if="socialMedia.instagram && Object.keys(socialMedia.instagram).length > 0">
        <td class="icon">
          <a :href="socialMedia.instagram.link" target="_blank">
            <icon name="instagram-color" />
          </a>
        </td>
        <td class="name">Instagram</td>
        <td>
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              :style="{
                width:
                  (socialMedia.instagram.nb_followers / maxFollowers) * 100 +
                  '%',
              }"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </td>
        <td class="legend">
          {{ socialMedia.instagram.nb_followers | numberOfFollowers }}
        </td>
      </tr>
      <tr v-if="socialMedia.twitter && Object.keys(socialMedia.twitter).length > 0">
        <td class="icon">
          <a :href="socialMedia.twitter.link" target="_blank">
            <icon name="twitter-color" />
          </a>
        </td>
        <td class="name">Twitter</td>
        <td>
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              :style="{
                width:
                  (socialMedia.twitter.nb_followers / maxFollowers) * 100 + '%',
              }"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </td>
        <td class="legend">
          {{ socialMedia.twitter.nb_followers | numberOfFollowers }}
        </td>
      </tr>

      <tr v-if="socialMedia.linkedin && Object.keys(socialMedia.linkedin).length > 0">
        <td class="icon">
          <a :href="socialMedia.linkedin.link" target="_blank">
            <icon name="linkedin" />
          </a>
        </td>
        <td class="name">Linkedin</td>
        <td>
          <div class="progress">
            <div
                class="progress-bar"
                role="progressbar"
                :style="{
                width:
                  (socialMedia.linkedin.nb_followers / maxFollowers) * 100 + '%',
              }"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
          </div>
        </td>
        <td class="legend">
          {{ socialMedia.linkedin.nb_followers | numberOfFollowers }}
        </td>
      </tr>

      <tr v-if="socialMedia.youtube && Object.keys(socialMedia.youtube).length > 0">
        <td class="icon">
          <a :href="socialMedia.youtube.link" target="_blank">
            <icon name="youtube-color" />
          </a>
        </td>
        <td class="name">YouTube</td>
        <td>
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              :style="{
                width:
                  (socialMedia.youtube.nb_followers / maxFollowers) * 100 + '%',
              }"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </td>
        <td class="legend">
          {{ socialMedia.youtube.nb_followers | numberOfFollowers }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'SocialMediaFollowers',
  data() {
    return {
      followers: [],
      minFollowers: 0,
      maxFollowers: 0,
    };
  },
  mounted() {
    this.collectFollowers();
  },
  computed: {
    socialMedia() {
      return store.getters['dashboard/getSocialMedia'];
    },
  },
  filters: {
    numberOfFollowers: (value) => {
      if (value < 1000) {
        return value;
      } else if (value > 1000 && value <= 99999) {
        return (value / 1000).toFixed(2) + ' K';
      } else if (value > 99999) {
        return (value / 1000000).toFixed(2) + ' M';
      } else {
        return value;
      }
    },
  },
  methods: {
    collectFollowers() {
      if (this.socialMedia.facebook)
        this.followers.push(this.socialMedia.facebook.nb_followers);
      if (this.socialMedia.instagram)
        this.followers.push(this.socialMedia.instagram.nb_followers);
      if (this.socialMedia.twitter)
        this.followers.push(this.socialMedia.twitter.nb_followers);
      if (this.socialMedia.youtube)
        this.followers.push(this.socialMedia.youtube.nb_followers);
      if (this.socialMedia.linkedin)
        this.followers.push(this.socialMedia.linkedin.nb_followers);

      this.maxFollowers = Math.max.apply(Math, this.followers);
      this.minFollowers = Math.min.apply(Math, this.followers);
    },
  },
};
</script>

<style lang="scss" scoped>
table.social-followers {
  width: 100%;
  tr {
    line-height: 30px;
  }
  .icon {
    width: 15px;
    svg {
      height: 30px;
      margin-right: 8px;
      margin-bottom: 0;
    }
  }
  .name {
    max-width: 50px;
  }
  .name,
  .legend {
    color: #253242;
    font-size: 13px;
    font-weight: 600;
  }
  .legend {
    text-align: right;
    white-space: nowrap;
  }
  .progress {
    box-sizing: border-box;
    background: none;
    margin-left: 6px;
    width: 100%;
    max-width: 100%;
    min-width: 65px;
    .progress-bar {
      background-color: #14dffb;
    }
  }
  tr:nth-child(2) {
    .progress-bar {
      opacity: 0.75;
    }
  }
  tr:nth-child(3) {
    .progress-bar {
      opacity: 0.5;
    }
  }
  tr:nth-child(4) {
    .progress-bar {
      opacity: 0.25;
    }
  }
}
</style>
