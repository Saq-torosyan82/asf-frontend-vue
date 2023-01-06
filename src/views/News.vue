<template>
  <div class="content">
    <HeaderNavigation>News</HeaderNavigation>

    <b-tabs class="news-content-component">
      <b-tab
          title="All Sports"
          active
          active-class="active-ba"
          @click="() => currentTab(false)">
        <div class="component">

<!--          <NewsFilterIcon class="filter-svg" @click="showFilter = !showFilter"/>-->
<!--          <NewsFilter class="news-filter" v-if="showFilter"/>-->
          <div
            v-for="(item, index) in news.data"
            @click="openNewsPage(item.link)"
            :key="index"
            class="news-item inline"
          >
            <div class="resource">
              <img src="../assets/img/g14.png" alt="" />
            </div>
            <div
              class="news-image"
              :style="{
                'width': '170px',
                'background-image': `url(${item.image ? item.image : require('@/assets/img/placeholder-image.jpg')})`,
              }"
            ></div>
            <div class="news-text">
              <h1 class="news-title">{{ item.title }}</h1>
              <p class="article-description">{{ item.info | limitString }}</p>
              <p class="date">{{ item.news_date }}</p>
            </div>
            <Icon name="news-navigation-arrow"/>
          </div>
          <div class="pagination-container">
            <div
                @click="(event) => previousPage(event)"
                class="load-more"
                v-if="news.prev_page_url != null">
              Previous
            </div>
            <div
                @click="(event) => nextPage(event)"
                class="load-more"
                v-if="news.next_page_url != null">
              Next
            </div>
          </div>
        </div>
      </b-tab>


      <b-tab
          v-for="(item, index) in savedSports"
          :key="index"
          :title="item.name"
          @click="() => currentTab(item)">
        <div class="component">
          <h5 v-if="news.data.length == 0">No {{item.name}} news available</h5>

<!--          <NewsFilterIcon class="filter-svg" @click="showFilter = !showFilter"/>-->
<!--          <NewsFilter class="news-filter" v-if="showFilter"/>-->
          <div
              v-for="(item, index) in news.data"
              @click="openNewsPage(item.link)"
              :key="index"
              class="news-item inline"
          >
            <div class="resource">
              <img src="../assets/img/g14.png" alt="" />
            </div>
            <div
                class="news-image"
                :style="{
                'width': '170px',
                'background-image': `url(${item.image ? item.image : require('@/assets/img/placeholder-image.jpg')})`,
              }"
            ></div>
            <div class="news-text">
              <h1 class="news-title">{{ item.title }}</h1>
              <p class="article-description">{{ item.info | limitString }}</p>
              <p class="date">{{ item.news_date }}</p>
            </div>
            <Icon name="news-navigation-arrow" />
          </div>
          <div class="pagination-container">
            <div
                @click="(event) => previousPage(event)"
                class="load-more"
                v-if="news.prev_page_url != null">
              Previous
            </div>
            <div
                @click="(event) => nextPage(event)"
                class="load-more"
                v-if="news.next_page_url != null">
              Next
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>
    <Footer/>
  </div>
</template>
<script>
import Icon from '@/components/Icon';
import Footer from '@/components/Footer';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
// import NewsFilter from '@/components/News/NewsFilter.vue';
import {horizontalScroll} from '../main';
import RepositoryFactory from '@/repositories/RepositoryFactory';

const NewsRepository = RepositoryFactory.get('news');
// import NewsFilterIcon from '@/assets/icons/news-filter-icon.svg';

export const LimitString = {
  STRING_LENGTH: 650,
};

export default {
  components: {
    Icon,
    HeaderNavigation,
    Footer,
    // NewsFilter,
    // NewsFilterIcon,
  },
  filters: {
    limitString(string, length = LimitString.STRING_LENGTH) {
      if (string.length > length) {
        return string.substring(0, length) + '...';
      } else {
        return string;
      }
    },
  },
  mounted() {
    this.getNews();
    horizontalScroll();
    this.getAllSport();
  },
  methods: {
    getNews(sport = this.selectedTab, next = false, prev = false) {
      let $this = this;
      $this.$loading(true);
      NewsRepository.getSportNews(sport, next, prev)
        .then((res) => {
          this.news = res.data;
          $this.$loading(false);
        })
        .catch((err) => {
          console.error(err.message);
          $this.$loading(false);
        });
    },
    openNewsPage: function (link) {
      window.open(link, '_blank');
    },
    getAllSport() {
      let $this = this;
      $this.$loading(true);
      NewsRepository.getSport()
          .then((res) => {
            this.savedSports = res.data.data;
            $this.$loading(false);
          })
          .catch((err) => {
            console.error(err.message);
            $this.$loading(false);
          });
    },
    previousPage(){
      window.scrollTo({top: 0, behavior: 'smooth'});
      this.getNews(this.selectedTab, this.news.prev_page_url)
    },
    nextPage(){
      window.scrollTo({top: 0, behavior: 'smooth'});
      this.getNews(this.selectedTab, this.news.next_page_url)
    },
    currentTab(item){
      const itemArray = [];
      itemArray.push(item)
      this.selectedTab = itemArray
      this.getNews(itemArray)
    }
  },
  data() {
    return {
      showFilter: false,
      news: [],
      savedSports: [],
      selectedTab: false
    };
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
//////////////////////////////////////
///// Layout
//////////////////////////////////////
.news-content-component {
  margin-top: 30px;
  .component {
    /*  TO BE REMOVED WHEN CONENT ARRIVES  */
    min-height: calc(100vh - 221px);
  }
  .filter-svg {
    position: absolute;
    right: 20px;
    cursor: pointer;
    z-index: 10;
  }

  .news-filter {
    position: absolute;
    right: 0px;
    top: 45px;
    z-index: 10;
  }
}
.news-item {
  gap: 25px;
  cursor: pointer;
  margin-top: 10px;
  position: relative;
  &:first-child {
    margin-top: 0px;
  }
  img {
    object-fit: cover;
  }
  .resouce {
    img {
      width: 75px;
      height: 75px;
    }
  }
  .news-image {
    width: 250px;
    height: 170px;
    aspect-ratio: 1;
    border-radius: 8px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  .news-text {
    font-size: 14px;
    .news-title {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .article-description {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    p {
      margin-bottom: 0;
      &.date {
        color: #777777;
      }
    }
  }
  svg {
    fill: #777777;
    min-width: 25px;
  }
}
.load-more{
  font-size: 14px;
  font-weight: bold;
  color: #369EBA;
  cursor: pointer;
  padding: 20px 0 0 10px;
}
.pagination-container{
  display: flex;
  justify-content: center;
}
//////////////////////////////////////
///// Media
//////////////////////////////////////
@media only screen and (max-width: 750px) {
  .news-item {
    flex-direction: column;
    border-bottom: 1px solid #cfcece;
    padding: 20px 0;
    .news-image {
      width: 100%;
      height: 200px;
    }
    .resource {
      position: absolute;
      top: 30px;
      right: 20px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .news-text {
      .date {
        margin-top: 10px;
      }
    }
    svg {
      display: none;
    }
  }
}

@media only screen and (min-width: 751px){
  .news-item {
    .resource {
      img {
        width: 75px;
        height: 75px;
      }
    }
  }
}
</style>
