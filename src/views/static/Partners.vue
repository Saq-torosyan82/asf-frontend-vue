<template>
  <div class="content">
    <HeaderNavigation>Partners</HeaderNavigation>
    <div class="partners-wrapper">
      <div class="partners-header">
        <h1>Meet our legal partners</h1>
        <p>
          We combine high-quality, clear pragmatic and straight to the point
          advice backed by the latest technology with support from a global
          network of expert partner firms.
        </p>
      </div>

      <div class="countries" v-show="selectedCountry == null">
        <h3 class="sectionHeading">Choose country</h3>
        <div class="selectionBody">
          <div
            v-for="(item, index) in countries"
            :key="index"
            class="selectionItem"
            @click="selectCountry(index)"
          >
            <div class="image">
              <img
                :src="
                  item.logo && item.logo !== ''
                    ? item.logo
                    : require('../../assets/img/uk-flag.png')
                "
              />
            </div>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div class="partners" v-show="selectedCountry != null">
        <a class="back-link" @click="selectCountry(null)"
          ><icon name="back-arrow" />Back to deal information</a
        >
        <div class="selected-country">
          <div class="image">
            <img src="../../assets/img/uk-flag.png" />
          </div>
          <p>UK</p>
        </div>

        <div class="selectionBody">
          <div
            v-for="(item, index) in partners"
            :key="index"
            class="selectionItem"
          >
            <div class="image">
              <img
                :src="
                  item.logo && item.logo !== ''
                    ? item.logo
                    : require('../../assets/img/uk-flag.png')
                "
              />
            </div>
            <p>{{ item.name }}</p>
            <div class="hover">
              <a href="#">https://www.twobirds.com/</a>
              <p>
                Bird & Bird is an international law firm with a focus on helping
                organisations being changed by technology and the digital world.
                With over 1,300 lawyers in 29 offices across Europe, the Middle
                East, Asia-Pacific and North America, they are ready to help a
                client wherever he is in the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNavigation from '@/components/HeaderNavigation.vue';

export default {
  components: {
    HeaderNavigation,
  },
  mounted() {},
  data: () => {
    return {
      selectedCountry: null,
      countries: [
        {
          logo: null,
          name: 'UK',
        },
        {
          logo: null,
          name: 'Germany',
        },
        {
          logo: null,
          name: 'USA',
        },
        {
          logo: null,
          name: 'Spain',
        },
        {
          logo: null,
          name: 'Africa',
        },
        {
          logo: null,
          name: 'China',
        },
        {
          logo: null,
          name: 'Japan',
        },
        {
          logo: null,
          name: 'Canada',
        },
        {
          logo: null,
          name: 'Australia',
        },
      ],
      partners: [
        {
          logo: null,
          name: 'Bird & Bird',
        },
        {
          logo: null,
          name: 'Charles Russel Speechlys',
        },
        {
          logo: null,
          name: 'Clifford Chance',
        },
        {
          logo: null,
          name: 'Cresta',
        },
        {
          logo: null,
          name: 'Dentos',
        },
        {
          logo: null,
          name: 'Dla piper',
        },
        {
          logo: null,
          name: 'Farrer & Co',
        },
        {
          logo: null,
          name: 'Fieldfisher',
        },
        {
          logo: null,
          name: 'Fladgate',
        },
      ],
    };
  },
  methods: {
    selectCountry(id) {
      this.selectedCountry = id;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  background-color: white;
  min-height: 100vh;
}
.partners-wrapper {
  max-width: 800px;
  margin: auto;
  padding-bottom: 150px;
}
.partners-header {
  margin-top: 50px;
  text-align: center;
}
.partners-header h1 {
  font-size: 18px;
  color: #253242;
}
.partners-header p {
  font-size: 14px;
  color: #707d8c;
  max-width: 800px;
  margin: auto;
}

/* Selection */
.sectionHeading {
  font-size: 16px;
  margin: 45px 0 65px;
}
.selectionBody {
  display: grid;
  max-width: 792px;
  gap: 40px 15px;
}
.selectionItem {
  position: relative;
}
a.back-link {
  display: block;
  font-size: 14px;
  color: #707d8c;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 55px;
}
a.back-link svg {
  margin-bottom: 3px;
}
.partners-wrapper .image {
  width: 120px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid #e9e9e9;
  display: grid;
  margin: auto;
}
.selectionBody img,
.selected-country img {
  place-self: center;
}
.selected-country .image {
  border: 3px solid #fad31b;
}
.selected-country {
  margin-bottom: 40px;
}
.selectionBody p,
.selected-country p {
  margin: 8px auto 0;
  text-align: center;
  color: #707d8c;
  font-size: 12px;
}
.selectionItem {
  cursor: pointer;
  a {
    color: var(--primary);
  }
}
.selectionItem.selected {
  display: block;
  min-width: 200px;
  margin-bottom: 20px;
  cursor: initial;
}

.selectionItem .hover {
  display: none;
  position: absolute;
  top: calc(-150% - 10px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  padding: 32px 24px;
  background-color: white;
  box-shadow: 2px 3px 12px rgba(112, 125, 140, 0.15);
  border-radius: 4px;
  min-width: 320px;
}
.selectionItem:hover .hover {
  display: initial;
}
.selectionItem:hover p {
  font-weight: 600;
}
.selectionItem:hover .image {
  border: 3px solid #e9e9e9;
}
.hover a {
  font-size: 12px;
}
.hover p {
  font-size: 12px;
  text-align: left;
  color: #253242;
}

@media only screen and (min-width: 750px) {
  .selectionBody {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media only screen and (max-width: 750px) {
  .selectionBody {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (max-width: 560px) {
  .selectionBody {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
