<template>
  <div id="header-navigation">
    <h2 class="header-navigation-title"><slot></slot></h2>
    <div class="search-input" v-if="displayClubSearch">
      <input
        id="header-navigation-search"
        placeholder="Clubs search"
        @keyup="showSearchResult"
        @click="clubsVisible"
        v-model="searchQuery"
        type="text"
        autocomplete="off"
      /><IconSearch id="search-icon" />
      <div
        class="dropdown-clubs-search"
        v-if="isVisible"
        v-click-outside="hideSearch"
        ref="dropdown-clubs-search"
      >
        <p class="heading" v-if="showClubs">All Clubs</p>
        <p class="heading" v-else-if="showLeagues">All Leagues</p>
        <ul v-if="items != null && items.length > 0">
          <li
            v-for="item in items"
            :key="item.id"
            @click="getSnapshotOrClubs(item.id)"
          >
            <img v-lazyload :data-src="item.logo" alt="" />
            <p>{{ item.name }}</p>
          </li>
        </ul>
        <p v-else class="message">No results match your search</p>
      </div>
    </div>
    <div class="mobile-header inline">
      <div class="background-elements-wrapper">
        <div class="background-elements">
          <div class=""></div>
          <div class=""></div>
          <div class=""></div>
        </div>
      </div>

      <LogoImage class="mobile-logo" />
      <div class="icon-menu inline">
        <a :href="buttonLink" class="additionalButton" v-show="buttonText">{{
          buttonText
        }}</a>
        <div class="notifications dropdown">
          <a href="#" class="icon">
            <IconNotification />
          </a>
          <div class="notifications below">
            <h1>aaa</h1>
          </div>
        </div>
        <div class="user dropdown" :class="dropdownIsVisible ? 'active ' : ''">
          <a href="#" class="icon" @click="dropdownVisible()">
            <IconUser />
          </a>
          <div class="user below" v-show="dropdownIsVisible">
            <div v-if="userInfo">
              <h5>{{ userInfo.first_name }} {{ userInfo.last_name }}</h5>
              <p>{{ userInfo.email }}</p>
            </div>

            <router-link v-if="displayViewProfileLink" to="/edit"
              >View profile</router-link
            >
            <Logout></Logout>
          </div>
        </div>

        <div
          class="hamburger-lines hamburger onlyMobile dropdown"
          :class="sidebarOpen ? 'active' : ''"
          @click="toggleSidebar()"
        >
          <span class="line line1"></span>
          <span class="line line2"></span>
          <span class="line line3"></span>
        </div>
      </div>
    </div>
    <BaseModal
      modal-type="club-snapshot"
      v-if="showSnapshot"
      @closed="closeModal()"
      :fullSnapshotReport="fullSnapshotReport"
      @selectedCurrency="onSelectedCurrency"
    ></BaseModal>
  </div>
</template>

<script>
/*ICONS*/
import IconNotification from '@/assets/icons/mobile-notification.svg';
import IconUser from '@/assets/icons/mobile-user.svg';
import IconSearch from '@/assets/icons/search.svg';
import Logout from '../views/auth/Logout';
import UserService from '../services/user.service';
import User from '../modules/User/User';
import LogoImage from '@/assets/icons/sidebar/logo-sidebar.svg';
import SystemRepository from '@/repositories/System/SystemRepository';
import FinancialRepository from '@/repositories/Financials/FinancialRepository';
import SearchMixin from '@/mixins/DealCalculator/Search.mixin';
import BaseModal from '@/components/BaseModal';
export default {
  name: 'HeaderNavigation',
  mixins: [SearchMixin],
  props: {
    user: User,
    buttonText: {
      type: String,
      default: null,
    },
    buttonLink: {
      type: String,
      default: null,
    },
  },
  components: {
    IconNotification,
    IconUser,
    IconSearch,
    Logout,
    LogoImage,
    BaseModal,
  },
  data: function () {
    return {
      data: {
        1: 10,
        2: 100,
      },
      dropdownIsVisible: false,
      isVisible: false,
      clubs: null,
      itemsToShow: null,
      fullSnapshotReport: {},
      showSnapshot: false,
      items: null,
      leagues: null,
      showClubs: false,
      showLeagues: true,
      clubId: ''
    };
  },
  computed: {
    sidebarOpen() {
      return this.$store.state.sidebar.sidebarOpen;
    },
    userInfo: () => {
      return UserService.getUserInfo();
    },
    displayViewProfileLink() {
      if (User.isAdmin() || User.isLender()) return false;

      return true;
    },
    displayClubSearch() {
      if (User.isCorporate() || User.isLender()) return true;

      return false;
    },
  },
  watch: {
    itemsToShow() {
      if (this.showClubs === true) {
        this.items = this.itemsToShow;
      }
    },
  },
  mounted() {
    this.getClubs();
    this.getLeagues();
  },
  methods: {
    closeModal() {
      this.showSnapshot = false;
      this.clubId = ''
    },
    getSnapshotOrClubs(id) {
      if (this.showLeagues) {
        SystemRepository.getClubsByCountryAndLeague('', id)
          .then((response) => {
            this.itemsToShow = response.data.data;
            this.showLeagues = false;
            this.showClubs = true;
            this.$refs['dropdown-clubs-search'].scrollTop = 0;
          })
          .catch((error) => {
            console.error('Error: ' + error);
          });
      } else if (this.showClubs) {
        FinancialRepository.getClubSnapshotReport(id)
          .then((response) => {
            this.fullSnapshotReport = response.data;
            this.showSnapshot = true;
            this.itemsToShow = this.clubs;
            this.items = this.leagues;
            this.searchQuery = '';
            this.isVisible = false;
            this.showLeagues = true;
            this.showClubs = false;
            this.clubId = id
          })
          .catch((error) => {
            console.error('Error: ' + error);
          });
      }
    },
    hideSearch(e) {
      if (
        e.target.id !== 'header-navigation-search' &&
        e.target.id !== 'search-icon'
      ) {
        if (this.searchQuery === '') {
          this.showLeagues = true;
          this.showClubs = false;
          this.items = this.leagues;
        }
        this.isVisible = false;
        this.clubId = ''
      } else if (e.target.id === 'search-icon') {
        this.clubsVisible();
      }
    },
    getClubs() {
      SystemRepository.getAllClubs()
        .then((response) => {
          this.clubs = response.data.data;
          this.itemsToShow = response.data.data;
        })
        .catch((error) => {
          console.error('Error: ' + error);
        });
    },
    getLeagues() {
      SystemRepository.getLeagues()
        .then((response) => {
          this.leagues = response.data.data;
          this.items = this.leagues;
        })
        .catch((error) => {
          console.error('Error: ' + error);
        });
    },
    dropdownVisible() {
      this.dropdownIsVisible = !this.dropdownIsVisible;
    },
    clubsVisible() {
      this.isVisible = !this.isVisible;
    },
    toggleSidebar() {
      this.$store.dispatch('toggleSidebar');
    },
    showSearchResult() {
      this.isVisible = true;
      if (this.searchQuery === '') {
        this.showLeagues = true;
        this.showClubs = false;
        this.items = this.leagues;
      } else {
        this.search('clubs');
        this.showLeagues = false;
        this.showClubs = true;
      }
    },
    onSelectedCurrency(currency) {
      let $this = this;
      $this.$loading(true);
      FinancialRepository.getClubSnapshotWithCurrencyReport(this.clubId, currency)
          .then((res) => {
            this.fullSnapshotReport = res.data;
            $this.$loading(false);
          })
          .catch((err) => {
            console.error(err);
            $this.$loading(false);
          });
    }
  },
};
</script>

<style lang="scss" scoped>
.onlyMobile {
  display: none;
}
#header-navigation {
  display: flex;
  width: 100%;
  align-items: center;
}
.header-navigation-title {
  flex-grow: 1;
  font-size: 25px;
  font-weight: 600;
  color: var(--primary);
  margin: 0;
  z-index: 10;
}
#header-navigation-search {
  width: 200px;
  height: 35px;
  border: 1px solid #d9dfe5;
  font-size: 14px;
  font-weight: 600;
  color: #707d8c;
  border-radius: 4px;
  padding-left: 12px;
  background-color: #ffffff;
}
#header-navigation-search:focus {
  outline: #0b61c4;
}
.dropdown-clubs-search {
  position: absolute;
  background-color: #fff;
  width: 320px;
  max-height: 80vh;
  z-index: 6;
  overflow-y: auto;
  top: 37px;
  right: 0;
  border: 1px solid #f6f6f6;
  box-sizing: border-box;
  box-shadow: 2px 4px 20px rgba(37, 50, 66, 0.17);
  border-radius: 4px;
  transition: all 0.25s ease-in-out;
}
.dropdown-clubs-search p.heading {
  color: #a3abad;
  font-size: 12px;
  font-weight: 400;
  line-height: 13px;
  padding: 20px 20px 10px;
  margin-bottom: 0;
}
.dropdown-clubs-search ul {
  padding-left: 0;
  margin-bottom: 0;
}
.dropdown-clubs-search ul li {
  padding: 6px 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  column-gap: 8px;
}
.dropdown-clubs-search ul li:hover {
  background: #f6f6f6;
}
.dropdown-clubs-search ul li:last-child {
  padding-bottom: 20px;
}
.dropdown-clubs-search ul li p {
  margin-bottom: 0;
}
.dropdown-clubs-search ul li img {
  width: 30px;
  object-fit: contain;
  height: 30px;
}
.dropdown-clubs-search .message {
  color: #060708;
  font-size: 14px;
  font-weight: 700;
  padding: 0 20px;
}
.search-input {
  position: relative;
  margin: 0;
}
.search-input svg {
  position: absolute;
  right: 15px;
  top: 9px;
}
.additionalButton {
  color: #ffffff;
  padding: 8px 24px;
  background-color: var(--primary);
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
}

.icon {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 50px;
}
.dropdown.active svg path {
  fill: white;
  stroke: white;
}
.dropdown:hover .icon {
  background-color: #eee;
}
.dropdown.active .icon {
  background-color: var(--primary);
}

.icon svg path {
  width: 30px;
  height: 30px;
  fill: black;
  stroke: black;
}

/* Dropdown */

.dropdown {
  position: relative;
  margin-left: 16px;
  width: 28px;
  height: 28px;
}
.dropdown.notifications .below {
  display: none;
}
.dropdown .below {
  position: absolute;
  top: 36px;
  right: 0;
  min-width: 250px;
  padding: 20px;
  z-index: 99;
  background-color: white;
  border: 1px solid #f6f6f6;
  border-radius: 4px;
  box-shadow: 2px 4px 20px rgba(37, 50, 66, 0.17);
}
.dropdown .below * {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
}
.dropdown .below *:last-child {
  margin-bottom: 0;
}
.dropdown .below h5 {
  font-weight: 700;
}
.dropdown .below p {
  font-weight: 400;
  margin-bottom: 12px;
}
.dropdown .below a {
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
}
.dropdown .below a:hover {
  text-decoration: underline;
  color: #0d4e9a;
}

@media only screen and (min-width: 750px) {
  .mobile-logo,
  .background-elements,
  .hamburger {
    display: none !important;
  }
}
@media only screen and (max-width: 750px) {
  .search-input {
    display: none;
  }
  .dropdown .below {
    top: 50px;
  }
  .dropdown svg path {
    fill: white;
    stroke: white;
  }
  .icon.icon {
    background-color: transparent;
  }
  .onlyMobile {
    display: initial;
  }
  .mobile-header {
    position: fixed;
    top: 0rem;
    right: 0px;
    left: 0;
    z-index: 20;
    height: 64px;
    background: var(--main-gradient);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    /* overflow: hidden; */
    box-shadow: 2px 4px 24px rgba(37, 50, 66, 0.4);
  }
  /** BACKGROUND ELEMENTS */
  .background-elements-wrapper {
    position: absolute;
    height: 100%;
    width: 210px;
    overflow: hidden;
    left: 0;
  }
  .background-elements {
    position: absolute;
    top: -5rem;
    left: -8rem;
    z-index: -1;
    div {
      width: 300px;
      height: 200px;
      border-radius: 50%;
      position: absolute;
      &:nth-child(1) {
        background: #ffffff;
      }
      &:nth-child(2) {
        background: #ffffff;
        opacity: 0.1;
        top: 10px;
        left: 13px;
      }
      &:nth-child(3) {
        background: #ffffff;
        opacity: 0.1;
        top: 20px;
        left: 20px;
      }
    }
  }
}

.hamburger-lines {
  height: 18.35px;
  width: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  .line {
    display: block;
    height: 2px;
    width: 100%;
    border-radius: 10px;
    background: white;
  }
  .line1 {
    transform-origin: 0% 0%;
    transition: transform 0.4s ease-in-out;
  }
  .line2 {
    transition: transform 0.2s ease-in-out;
  }
  .line3 {
    transform-origin: 0% 100%;
    transition: transform 0.4s ease-in-out;
  }
  &.active {
    .line1 {
      transform: rotate(45deg);
    }
    .line2 {
      transform: scaleY(0);
    }
    .line3 {
      transform: rotate(-45deg);
    }
  }
}
</style>
