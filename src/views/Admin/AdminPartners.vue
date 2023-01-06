<template>
  <div class="content partners-page">
    <div class="partners-page-header">
      <HeaderNavigation>Partners</HeaderNavigation>
    </div>

    <div class="partners-container">
      <div class="partners-content">
        <div class="header">
          <span class="txt-title">Meet our legal partners</span>
          <span class="txt-description"
            >We combine high-quality, clear pragmatic and straight to the point
            advice backed by the latest technology with support from a global
            network of expert partner firms.</span
          >
        </div>
        <div class="country-list-content" v-if="!isSelectCountry">
          <span class="txt-intro">Choose country</span>
          <div class="list-content">
            <div
              class="content-section"
              v-for="(country, index) in countryFlagAndName"
              :key="index"
              @click="onSelectCountry(country)"
            >
              <div class="content-img">
                <!-- <img :src="`${country.flag}`" /> -->
                <div
                  class="div-img"
                  :style="{ 'background-image': 'url(' + country.flag + ')' }"
                />
              </div>
              <span class="content-name">{{ country.name }}</span>
            </div>
          </div>
        </div>
        <div v-else class="country-partners-list">
          <span @click="onBack" class="txt-back"
            >&#60;&nbsp;Back to the countries</span
          >
          <div class="selected-country-section">
            <div class="section-img">
              <div
                class="div-img"
                :style="{
                  'background-image': 'url(' + selectedCountry.flag + ')',
                }"
              ></div>
            </div>
            <span class="section-name">{{ selectedCountry.name }}</span>
          </div>

          <div class="list-content">
            <div
              class="content-section"
              v-for="(country, index) in countryFlagAndName"
              :key="index"
            >
              <v-tooltip
                bottom
                color="rgba(255, 255, 255, 1)"
                max-width="300"
                nudge-bottom="20"
              >
                <template v-slot:activator="{ on }">
                  <div class="content-img">
                    <div
                      class="div-img"
                      :style="{
                        'background-image':
                          'url(https://i0.wp.com/sportsfinding.com/wp-content/uploads/2020/02/nike-swoosh-wikipedia.jpg?fit=580%2C350&ssl=1&resize=1280%2C720)',
                      }"
                      v-on="on"
                    />
                    <!-- <DummyPartnerImg class="div-img" /> -->
                  </div>
                  <span class="content-name">Bird & Bird</span>
                </template>
                <span class="partner-intro"
                  >{{ index }}Bird & Bird is an international law firm with a
                  focus on helping organisations being changed by technology and
                  the digital world. With over 1,300 lawyers in 29 offices
                  across Europe, the Middle East, Asia-Pacific and North
                  America, they are ready to help a client wherever he is in the
                  world.</span
                >
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderNavigation from '@/components/HeaderNavigation.vue';
// import CountryFlag from 'vue-country-flag';
import countryCode from '@/assets/js/countryCode.json';
export default {
  components: {
    HeaderNavigation,
  },
  data() {
    return {
      countryListFromAPI: [
        'United Kingdom',
        'France',
        'Spain',
        'Germany',
        'Italy',
        'Portugal',
        'Netherlands',
        'United States',
        'Brazil',
        'Argentina',
        'Chile',
        'Colombia',
        'Switzerland',
        'Turkey',
        'Belgium',
        'Russia',
        'Serbia',
        'Croatia',
        'Greece',
        'Mexico',
        'Cyprus',
        'Canada',
      ],
      countryCode: countryCode,
      countryFlagAndName: [],
      isSelectCountry: false,
      selectedCountry: {},
    };
  },
  created() {
    this.setCountryFlagAndName();
  },
  methods: {
    setCountryFlagAndName() {
      this.countryFlagAndName = this.countryCode
        .map((country) => ({ name: country.name, flag: country.flag }))
        .filter((country) => this.countryListFromAPI.includes(country.name));
    },
    onSelectCountry(country) {
      this.isSelectCountry = true;
      this.selectedCountry = country;
    },

    onBack() {
      this.isSelectCountry = false;
    },
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/admin-partners.scss"
></style>
