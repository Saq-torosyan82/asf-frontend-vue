<template>
  <div class="news-widget-container">
    <div class="top">
      <NewsIcon class="scaleSvg"/>
      &nbsp;&nbsp;
      News widget
    </div>
    <div class="toggle">
      <div class="custom-bot-border">
        <span @click="toggleSelected" :class="{ selected: showSport }">Sport</span>
      </div>
    </div>
    <div class="body">
      <div class="sport" v-show="showSport">
        <div>
          <multiselect
              v-model="value"
              tag-placeholder="Add this as new tag"
              placeholder="Search or add a tag"
              label="name" track-by="code"
              :options="options"
              :multiple="true"
              :taggable="true"
              @tag="addTag">
          </multiselect>
        </div>
        <a ref="#" @click="saveSport" class="button">Save</a>
      </div>
    </div>
  </div>
</template>

<script>
import NewsIcon from '@/assets/icons/news-icon.svg';
import RepositoryFactory from '@/repositories/RepositoryFactory';
import Multiselect from 'vue-multiselect'

const NewsRepository = RepositoryFactory.get('news');

export default {
  name: "NewsWidget",
  components: {
    NewsIcon,
    Multiselect
  },
  data() {
    return {
      showSport: true,
      showCountry: false,
      allSportsList: [],
      allCountriesList: [],
      selectedSports: [],
      selectedCountries: [],
      savedSports: [],
      showSelectSport: false,
      value: [],
      options: []
    }
  },
  mounted() {
    this.getUserSavedSports();
    this.getSportAndCountry();
    this.pushCountry();
  },
  methods: {
    toggleSelected: function (e) {
      const selected = e.currentTarget.className;
      if (!selected) {
        this.showSport = !this.showSport
        this.showCountry = !this.showCountry
      }
    },
    getSportAndCountry() {
      let $this = this;
      $this.$loading(true);
      NewsRepository.getSport()
          .then((res) => {
            this.allSportsList = res.data.data;
            this.options = res.data.data;
            for (let j = 0; j < this.options.length; j++){
              delete this.options[j].has_club
              delete this.options[j].has_country
              delete this.options[j].has_league
              this.options[j].code = this.options[j].id
              delete this.options[j].id
            }
            for(let i = 0; i < this.savedSports.length; i++){
              this.allSportsList = this.allSportsList.filter( x => x.id !== this.savedSports[i].id);
            }
            $this.$loading(false);
          })
          .catch((err) => {
            console.error(err.message);
            $this.$loading(false);
          });
      NewsRepository.getCountry()
          .then((res) => {
            this.allCountriesList = res.data.data;
            $this.$loading(false);
          })
          .catch((err) => {
            console.error(err.message);
            $this.$loading(false);
          });
    },
    pushCountry(id, event) {
      if (id && event) {
        if(event.target.checked){
          this.selectedCountries.push(id)
        }else{
          this.selectedCountries = this.selectedCountries.filter(e => e !== id)
        }
      }
    },
    saveSport(){
      let $this = this;
      $this.$loading(true);
      this.selectedSports = []
      for (let j = 0; j < this.value.length; j++){
        this.selectedSports.push(this.options[j].code)
      }
      NewsRepository.saveSport(this.selectedSports)
          .then((res) => {
            $this.$loading(false);
          })
          .catch((err) => {
            console.error(err.message);
            $this.$loading(false);
          });
    },
    getUserSavedSports(){
      let $this = this;
      $this.$loading(true);
      NewsRepository.getSavedSports()
          .then((res) => {
            this.savedSports.push(...res.data)
            this.value.push(...res.data)
            for (let j = 0; j < this.value.length; j++){
              this.value[j].code = this.value[j].id
              delete this.value[j].id
            }
            $this.$loading(false);
          })
          .catch((err) => {
            console.error(err.message);
            $this.$loading(false);
          });
    },
    showModal(){
      this.showSelectSport = true
    },
    closeModal() {
      this.showSelectSport = false
      location.reload();
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    }
  }
}
</script>

<style lang="scss" scoped>
.news-widget-container {
  grid-area: news-widget-container;
}

::-webkit-scrollbar-thumb {
  background: #A0A0A0;
}

::-webkit-scrollbar-track {
  background: #fff;
}

.news-widget-container {
  height: 260px;

  .top {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    height: 39px;
    //background: linear-gradient(296.35deg, #6CD9F8 16.99%, #1AB2DC 54.95%);
    background: var(--main-gradient);
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .top,
  .toggle,
  .body {
    padding-left: 16px;
    padding-right: 16px;
  }

  .toggle,
  .body {
    background: #fff;
  }

  .toggle {
    color: #707D8C;
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 35px;

    span {
      padding-left: 10px;
      padding-right: 10px;
      cursor: pointer;
      transition: 0.10s;
    }

    .custom-bot-border,
    .selected {
      padding-bottom: 3px;
    }

    .custom-bot-border {
      border-bottom: 1px solid #D9DFE5;
    }

    .selected {
      color: #369EBA;
      border-bottom: 2px solid #369EBA;
      font-weight: bold;
    }
  }

  .body {
    height: 185px;
    position: relative;
    //overflow-x: hidden;
    //overflow-y: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .checkbox-container {
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 7px;
      cursor: pointer;
      font-size: 12px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      color: #060708;
      font-weight: 400;
    }

    .checkbox-container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 8px;
      height: 16px;
      width: 16px;
      background-color: #fff;
      border-radius: 50%;
      border: 1px solid #369EBA;
    }

    .checkbox-container input:checked ~ .checkmark {
      background-color: #2196F3;
      border: none;
    }

    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }

    .checkbox-container input:checked ~ .checkmark:after {
      display: block;
    }

    .checkbox-container .checkmark:after {
      top: 5px;
      left: 5px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: white;
    }

    .add {
      padding: 8px;

      span {
        font-size: 14px;
        font-weight: bold;
        color: #369EBA;
        cursor: pointer;
      }
    }

    a{
      position: absolute;
      bottom: 0;
    }
  }

  .scaleSvg{
    transform: scale(0.7);
  }
}
</style>
