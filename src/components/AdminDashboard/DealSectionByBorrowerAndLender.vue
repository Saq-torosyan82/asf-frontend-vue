<template>
  <div>
    <div class="deal-detail-list" v-if="!isDealDetail">
      <!-- <span class="icon-close" @click="onCloseDealCardList"></span> -->
      <div class="tap-btn">
        <div
          v-for="(title, index) in tabTitles"
          :key="index"
          class="tap-name"
          :class="isSelectedTab === index ? 'activeTab' : 'disableTab'"
          @click="onSelectTab(title, index)"
        >
          {{ title }}
        </div>
      </div>
      <AdminDealListByBorrowerAndLender
        :list="dealListByTap"
        @selectedDealDetail="selectedDealDetail"
        :showMessageDealSection="showMessageDealSection"
      />
    </div>
    <div v-else class="deal-detail-container">
      <SelectedDealDetail
        :selectedDeal="selectedDeal"
        @closeDealDetail="closeDealDetail"
      />
    </div>
  </div>
</template>
<script>
import AdminDealListByBorrowerAndLender from './AdminDealListByBorrowerAndLender.vue';
import SelectedDealDetail from './SelectedDealDetail.vue';
export default {
  components: {
    AdminDealListByBorrowerAndLender,
    SelectedDealDetail,
  },
  props: {
    isSelectedTab: {
      type: Number,
      default: 0,
    },
    dealListByTap: {
      type: Array,
      default: new Array(),
    },
    selectedDeal: {
      type: Object,
      default: new Object(),
    },
    isDealDetail: {
      type: Boolean,
      default: false,
    },
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tabTitles: ['Current deals', 'Past deals'],
      showMessageDealSection: true
    };
  },
  methods: {
    onSelectTab(title, index) {
      this.$emit('onSelectTab', title, index, this.tabTitles);
    },
    closeDealDetail() {
      this.$emit('closeDealDetail');
    },
    selectedDealDetail(data) {
      this.$emit('selectedDealDetail', data);
    },
  },
  watch: {
    showMessage() {
      this.showMessageDealSection = this.showMessage
    }
  }
};
</script>
<style lang="scss" scoped>
.deal-detail-list {
  // margin-left: 10px;
  width: 100%;
  height: 100%;
  position: relative;
  .icon-close {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    opacity: 0.8;
  }
  .icon-close:hover {
    opacity: 1;
  }
  .icon-close:before,
  .icon-close:after {
    position: absolute;
    left: 6px;
    content: ' ';
    height: 16px;
    width: 3px;
    background-color: #0d4e9a;
    border-radius: 10px;
  }
  .icon-close:before {
    transform: rotate(45deg);
  }
  .icon-close:after {
    transform: rotate(-45deg);
  }
  .tap-btn {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    height: 42px;
    .tap-name {
      font-size: 14px;
      line-height: 21px;
      font-weight: bold;
      color: #253242;
      padding: 12px 20px 15px 20px;
      height: 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      margin-right: 8px;
      cursor: pointer;
      &.activeTab {
        background: white;
      }
      &.disableTab {
        background: #f6f6f6;
      }
    }
  }
}
.deal-detail-container {
  margin-left: 10px;
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  color: #253242;
  background: white;
  border-radius: 8px;
  padding: 24px 16px;
  height: fit-content;
}
.deal-detail-container::after {
  content: '';
  position: absolute;
  top: 550px;
  right: 100%;
  margin-top: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent white transparent transparent;
}
@media screen and (max-width: 1263px) {
  .deal-detail-container {
    margin-left: 0;
  }
  .deal-detail-container::after {
    display: none;
  }
}
</style>
