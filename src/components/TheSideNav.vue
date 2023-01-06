<template>
  <div id="sidenav" :class="open ? 'menu-open' : ''">
    <div class="background-elements-container">
      <div class="background-elements">
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
      </div>
    </div>
    <router-link to="/">
      <LogoImage id="sidenav-logo" />
    </router-link>
    <!-- 
    <ul id="mobile-menu">
      <router-link to="/">
        <icon name="search" />
      </router-link>
      <router-link to="/">
        <icon name="notification" />
      </router-link>
      <router-link to="/">
        <icon name="user" />
      </router-link>
      <router-link to="/">
        <icon name="hamburger" />
      </router-link>
    </ul>

-->

    <ul class="sidebar-menu">
      <!--
      <router-link to="/">
        <icon name="dashboard" />
        Dashboard
      </router-link>

      <router-link to="/deals">
        <icon name="deals" />
        My Deals
      </router-link>

      <router-link v-if="displayViewProfileLink" to="/edit">
        <icon name="user-profile" />
        User Profile
      </router-link>

      <router-link to="/partners/">
        <icon name="chat" />
        Partners
      </router-link>

      <router-link to="#">
        <icon name="contact" />
        Inbox
      </router-link>

      <router-link v-if="displayFinancialsLink" to="#">
        <icon name="financials" />
        Financials
      </router-link>

      <router-link to="#">
        <icon name="chat" />
        Contact
      </router-link>

      <router-link to="#">
        <icon name="help" />
        Help
      </router-link>
      -->

      <SidebarLink to="/" icon="dashboard"> Dashboard </SidebarLink>

      <SidebarLink :to="userIsAdmin ? '/admin/deals' : '/deals'" icon="deals">
        {{ userIsAdmin ? 'Deals' : 'My Deals' }}
      </SidebarLink>

      <SidebarLink to="/edit" icon="userprofile" v-if="displayViewProfileLink">
        User Profile
      </SidebarLink>

      <SidebarLink
        to="/admin/user-profiles"
        icon="userprofile"
        v-if="displayUserProfiles"
      >
        User Profiles
      </SidebarLink>

      <SidebarLink to="/inbox" icon="inbox" v-if="displayInboxLink">
        Inbox
      </SidebarLink>

      <SidebarLink
        :to="userIsAdmin ? '/admin/financials' : '/financials'"
        icon="financials"
        v-if="displayFinancialsLink"
      >
        Financials
      </SidebarLink>

      <!-- <SidebarLink to="#" icon="chat"> Contact </SidebarLink> -->

      <SidebarLink to="/news" icon="news" v-if="!userIsAdmin">
        News
      </SidebarLink>

      <SidebarLink to="/admin/partners" icon="/admin/partners">
        Partners
      </SidebarLink>

      <SidebarLink v-if="!userIsAdmin" to="/help" icon="help">
        Help
      </SidebarLink>
    </ul>
    <div class="social-media inline">
      <a href="#"><icon name="facebook" /></a>

      <a href="#"><icon name="instagram" /></a>

      <a href="#"><icon name="twitter" /></a>

      <a href="#"><icon name="youtube" /></a>
    </div>
  </div>
</template>

<script>
import LogoImage from '@/assets/icons/sidebar/logo-sidebar.svg';
import User from '../modules/User/User';
import SidebarLink from '@/components/SidebarLink.vue';

export default {
  name: 'the-side-nav',
  components: { LogoImage, SidebarLink },
  computed: {
    open() {
      return this.$store.state.sidebar.sidebarOpen;
    },
    displayFinancialsLink() {
      return User.isAdmin() || User.isCorporate();
    },
    displayViewProfileLink() {
      if (User.isAdmin()) return false;

      return true;
    },
    displayUserProfiles() {
      if (User.isAdmin()) return true;

      return false;
    },
    userIsAdmin() {
      if (User.isAdmin()) return true;

      return false;
    },
    displayInboxLink() {
      if (
        User.isAdmin() ||
        User.isLender() ||
        User.isCorporate() ||
        User.isBorrower()
      )
        return true;

      return false;
    },
  },
  methods: {
    hideSidebar() {
      this.$store.dispatch('closeSidebar');
    },
  },
  mounted() {
    document
      .getElementById('sidenav')
      .addEventListener('click', this.hideSidebar);
  },
  beforeUnmount() {
    document
      .getElementById('sidenav')
      .removeEventListener('click', this.hideSidebar);
  },
};
</script>

<style lang="scss" scoped>
/* DESKTOP ONLY */

#sidenav {
  width: 163px;
  min-height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  border-radius: 0 20px 20px 0;
  /* overflow: hidden; */
  background: var(--sidebar-gradient);
  z-index: 21;
  transition: all 0.5s ease-in-out;
  .background-elements-container {
    position: absolute;
    height: 120px;
    width: 100%;
    overflow: hidden;
  }
}
#sidenav-logo {
  margin: 35px 0 65px 28px;
}
/*
  #mobile-menu {
    display: none;
  }
  */

.sidebar-menu {
  margin: 0;
  padding: 0;
}
.sidebar-menu a {
  padding: 10px 0 10px 28px;
  display: block;
  display: flex;
  align-items: center;
  text-decoration: none;
}
.sidebar-menu a svg {
  margin-right: 15px;
}

.sidebar-menu a.selected {
  background-color: rgba(255, 255, 255, 0.17);
  font-weight: bold;
}
.sidebar-menu a:hover {
  background-color: rgba(255, 255, 255, 0.07);
}
.social-media {
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 25px;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0 15px;
}
/* 
  .social-media li {
    display: inline;
    margin-right: 10px;
  }
  .social-media li:last-child {
    margin-right: 0px;
  } */
.social-media svg {
  width: 25px;
  height: 25px;
}

@media only screen and (min-width: 750px) {
  #sidenav {
    box-shadow: 2px 8px 20px rgba(37, 50, 66, 0.2);
  }
}
/* MOBILE ONLY */
@media only screen and (max-width: 750px) {
  #sidenav {
    left: -163px;
    &.menu-open {
      box-shadow: 50px 0px 100px rgba(37, 50, 66, 0.3);
      left: 0;
    }
  }
  /* #sidenav#sidenav {
    padding: 20px 24px;
    width: 100%;
    max-height: 64px;
    position: fixed;
    z-index: 20;
    background: var(--main-gradient);
    overflow: hidden;
    .background-elements {
      top: -5rem;
      left: -8rem;
    }
  } */
  /*
   #mobile-menu {
    display: initial;
    float: right;
  }
  #mobile-menu a {
    margin-left: 20px;
  }
  #mobile-menu a svg {
    width: 24px;
    height: 24px;
  }

  #mobile-menu {
    display: none;
  }
    */
  /* .sidebar-menu,
  .social-media {
    display: none !important;
  } */
  /* .sidebar-menu {
    border-radius: 0 20px 20px 0;
    box-shadow: 2px 4px 24px rgba(37, 50, 66, 0.4);
    background: var(--main-gradient);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
    width: 200px;
    padding: 40px 0 20px 20px;
    a {
      padding: 10px;
      font-size: 18px;
      display: block;
    }
  }
  .social-media {
    position: fixed;
    bottom: 20px;
    left: 10px;
    width: 200px;
  } */
}
/* GLOBAL */
#sidenav {
  color: white;
}
svg#sidenav-logo {
  max-width: 107px;
  height: 33px;
}
a {
  font-size: 14px;
  font-weight: regular;
  color: white;
}
/** BACKGROUND ELEMENTS */
.background-elements {
  position: absolute;
  top: -103px;
  left: -50%;
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
</style>
