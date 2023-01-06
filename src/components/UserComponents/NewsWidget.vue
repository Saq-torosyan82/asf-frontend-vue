<template>
  <div class="component-no-padding news-widget" :style="cssProps">
    <div class="news-header inline">
      <h5 class="component-header">Latest news</h5>
      <p @click="onClickWidget" style="cursor: pointer">All news</p>
    </div>
    <div
      class="news-slider"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <div class="navigation inline">
        <div class="icon" @click="prev()">
          <Icon name="news-navigation-arrow" />
        </div>
        <div class="slider-progress inline">
          <div
            class="dot"
            v-for="(item, index) in news"
            :key="index"
            :class="currentIndex == index ? 'current' : ''"
          ></div>
        </div>

        <div class="icon" @click="next()">
          <Icon name="news-navigation-arrow" />
        </div>
      </div>
      <div class="news-wrapper" @click="onClickWidget">
        <div
          v-for="(item, index) in news"
          :key="index"
          class="news"
          :class="currentIndex == index ? 'current' : ''"
          :style="{
            'background-image':
              'linear-gradient(to top, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.0)), url(' +
              item.image +
              ')',
          }"
        >
          <p class="date">{{ item.news_date }}</p>
          <p class="news-title">
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon';
import RepositoryFactory from '@/repositories/RepositoryFactory';
const NewsRepository = RepositoryFactory.get('news');

export default {
  components: { Icon },
  mounted() {
    this.startSlide();
    this.getNews();
  },
  data() {
    return {
      hover: false,
      savedSports: [],
      news: [],
      timer: 1, //Time on one slide in seconds
      currentIndex: 0,
    };
  },
  watch: {
    hover(newValue) {
      if (newValue) {
        clearInterval(this.timer);
      } else {
        this.startSlide();
      }
    },
  },
  methods: {
    // this.getNews(this.selectedTab, this.news.prev_page_url)
    async getNews(sport = false, next = false, prev = false) {
      let $this = this;
      $this.$loading(true);
      await NewsRepository.getSavedSports()
        .then(async (res) => {
          if (res.data.length === 0) {
            this.getAllSport();
          } else {
            await this.savedSports.push(...res.data);
          }
        })
        .catch((err) => {
          console.error(err.message);
          $this.$loading(false);
        });
      NewsRepository.getSportNews((sport = this.savedSports), next, prev)
        .then((res) => {
          if (res.data.data.length == 0) {
            this.getAllNews();
          } else {
            this.news = res.data.data;
          }
          $this.$loading(false);
        })
        .catch((err) => {
          console.error(err.message);
          $this.$loading(false);
        });
    },
    async getAllNews(sport = false, next = false, prev = false) {
      let $this = this;
      $this.$loading(true);
      NewsRepository.getSportNews(sport, next, prev)
        .then((res) => {
          this.news = res.data.data;
          $this.$loading(false);
        })
        .catch((err) => {
          console.error(err.message);
          $this.$loading(false);
        });
    },
    getAllSport() {
      let $this = this;
      $this.$loading(true);
      NewsRepository.getSport()
        .then((res) => {
          this.savedSports = res.data.data;
        })
        .catch((err) => {
          console.error(err.message);
          $this.$loading(false);
        });
    },
    onClickWidget: function () {
      this.$router.push(`/news`);
    },
    startSlide: function () {
      this.timer = setInterval(this.next, 5000);
    },

    next() {
      if (this.currentIndex >= this.news.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
    },
    prev() {
      if (this.currentIndex <= 0) {
        this.currentIndex = this.news.length - 1;
      } else {
        this.currentIndex -= 1;
      }
    },
  },
  computed: {
    cssProps() {
      return {
        '--width-of-slides': this.news.length * 100 + '%',
        '--slide-margin': -this.currentIndex * 100 + '%',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.news-header {
  width: 100%;
  padding: 15px;
  justify-content: space-between;
  h5 {
    margin-bottom: 0;
  }
  p {
    color: #3a9eba;
    font-weight: bold;
    margin-bottom: 0;
  }
}
.news-slider {
  height: 250px;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  .news-wrapper {
    display: flex;
    flex-direction: row;
    width: var(--width-of-slides);
    transition: all 1s ease-in-out;
    margin-left: var(--slide-margin);
  }
  .news {
    width: 100%;
    opacity: 0.6;
    padding: 15px;
    display: flex;
    height: 250px;
    cursor: pointer;
    flex-direction: column;
    background-size: cover!important;
    background: var(--main-gradient);
    transition-duration: 1.5s;
    transition: all 1.5s ease-in-out;
    background-position: center center;
    &.current {
      opacity: 1;
    }
    .date {
      font-size: 12px;
      color: white;
      margin-top: auto;
      margin-bottom: 5px;
    }
    .news-title {
      margin-bottom: 30px;
      color: white;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .navigation {
    position: absolute;
    width: 100%;
    bottom: 10px;
    padding: 0 15px;
    justify-content: space-between;
    z-index: 5;
    .icon {
      cursor: pointer;
      &:first-child {
        svg {
          transform: rotate(180deg);
        }
      }
    }
    svg {
      fill: white;
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
    .slider-progress {
      gap: 5px;
      .dot {
        transition: all 1s ease-in-out;
        width: 5px;
        height: 5px;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: white;
        opacity: 0.5;
        &.current {
          opacity: 1;
        }
      }
    }
  }
}
</style>
