<template>
  <div class="news-container">
    <div class="top">
      Filters
    </div>
    <div class="body">
      <h5>Choose sport</h5>
      <label
          v-for="(item, index) in savedSports"
          :key="index"
          class="checkbox-container">{{ item.name }}
        <input type="checkbox"
               @click="(event) => pushSport(item.id, event)">
        <span class="checkmark"></span>
      </label>

      <div class="add">
        <span>+ Add sport</span>
      </div>

      <h5>Choose country</h5>

      <label
          v-for="(item, index) in savedCountries"
          :key="index"
          class="checkbox-container">{{ item.name }}
        <input type="checkbox"
               @click="(event) => pushCountry(item.id, event)">
        <span class="checkmark"></span>
      </label>

      <div class="add">
        <span>+ Add country</span>
      </div>

    </div>
  </div>
</template>

<script>
import RepositoryFactory from '@/repositories/RepositoryFactory';

const NewsRepository = RepositoryFactory.get('news');

export default {
  name: "NewsFilter",
  data() {
    return {
      savedSports: [],
      savedCountries: [],
      selectedSports: [],
      selectedCountries: [],
    }
  },
  mounted() {
    this.getUserSavedSports();
  },
  methods: {
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
    getUserSavedSports() {
      let $this = this;
      $this.$loading(true);
      NewsRepository.getSavedSports()
          .then((res) => {
            if(res.data.length === 0){
              this.getAllSport()
            }else{
              this.savedSports.push(...res.data)
              $this.$loading(false);
            }
          })
          .catch((err) => {
            console.error(err.message);
            $this.$loading(false);
          });
    },
    pushSport(id, event) {
      if (id && event) {
        if(event.target.checked){
          this.selectedSports.push(id)
        }else{
          this.selectedSports = this.selectedSports.filter(e => e !== id)
        }
      }
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
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar-thumb {
  background: #A0A0A0;
}

::-webkit-scrollbar-track {
  background: #E2E5EA;
}

.news-container {
  width: 145px;

  .top {
    display: flex;
    align-items: center;
    padding-left: 12px;
    background: linear-gradient(90deg, #17AFD9 47.97%, #6CD9F8 99.51%);
    height: 40px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .body {
    max-height: 295px;
    overflow-x: hidden;
    overflow-y: auto;
    background: #E2E5EA;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    h5 {
      font-size: 14px;
      font-weight: bold;
      padding: 10px 5px;
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
  }
}


</style>
