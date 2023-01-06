<template>
  <div class="deal-list">
    <h5 v-if="list.length == 0 && showMessageDealList === true" class="no-lender">Please select a deal</h5>
    <div
      v-for="(data, index) in list"
      :key="index"
      class="deal-card"
      :class="cardStatus(data.reason)"
      @click="onSelectedDealDetail(data)"
    >
      <div class="div-section">
        <div class="deal-status-icon">
          <img
            v-if="cardStatus(data.reason) === 'no_started'"
            src="../../assets/img/dealcard_icon/no_started.png"
          />
          <img
            v-else-if="cardStatus(data.reason) === 'in_progress'"
            src="../../assets/img/dealcard_icon/in_progress.png"
          />
          <img
            v-else-if="cardStatus(data.reason) === 'accepted'"
            src="../../assets/img/dealcard_icon/accepted.png"
          />
          <img
            v-else-if="cardStatus(data.reason) === 'complete_done'"
            src="../../assets/img/dealcard_icon/complete_done.png"
          />
        </div>
        <div class="img-avatar">
          <img :src="data.counterparty.avatar" />
        </div>
        <div class="div-content">
          <span class="txt-title">{{ data.counterparty.name }}</span>
          <span class="txt-date"
            >{{ formatDate(data.start_date) }}&nbsp;-&nbsp;{{
              formatDate(data.finish_date)
            }}<span
              v-show="
                cardStatus(data.reason) === 'complete_done' ||
                cardStatus(data.reason) === 'started'
              "
              >&nbsp;by&nbsp;{{ data.lender }}</span
            ></span
          >
          <div class="amount-detail">
            <div class="amount">
              <span class="txt-name">Total borrowed</span>
              <span class="txt-amount"
                >{{ formatCurrency(data.currency)
                }}{{ data.contract_amount }}</span
              >
            </div>
            <div class="amount">
              <span class="txt-name">Outstanding</span>
              <span class="txt-amount"
                >{{ formatCurrency(data.currency) }}{{ data.outstanding }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="deal-progress">
        <div class="progress-intro">
          <span
            v-if="
              cardStatus(data.reason) === 'complete_done' ||
              cardStatus(data.reason) === 'started'
            "
            >Installments&nbsp;{{ data.paid_installments }}/{{
              data.nb_installments
            }}</span
          ><span v-else>Deal Completion</span>
          <span>{{ data.status_bar.percentaje }}%</span>
        </div>
        <v-progress-linear
          :value="parseFloat(data.status_bar.percentaje)"
          height="6"
          :color="progressBarColor"
          class="progress-bar-container"
        />
      </div>
      <label>{{ data.status_bar.label }}</label>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: 'AdminDealListByBorrowerAndLender',
  props: {
    list: {
      type: Array,
      default: new Array(),
    },
    showMessageDealSection: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      progressBarColor: '#93BEEF',
      showMessageDealList: true
    };
  },
  computed: {
    name() {
      return this.list[0].Name;
    },
  },
  watch: {
    showMessageDealSection() {
      this.showMessageDealList =  this.showMessageDealSection
    }
  },
  methods: {
    formatCurrency(currency) {
      switch (currency) {
        case 'USD':
          return '$';
        case 'GBP':
          return '£';
        default:
          return '€';
      }
    },
    cardStatus(deal_reason) {
      switch (deal_reason) {
        case 'draft':
        case 'missing_documents':
        case 'canceled':
        case 'rejected_asf':
          return 'no_started';
        case 'submitted':
        case 'under_review':
        case 'contract_issued':
          return 'in_progress';
        case 'approved_asf':
        case 'terms_uploaded':
        case 'terms_review':
          return 'live';
        case 'accepted_borrower':
        case 'signed_borrower':
          return 'accepted';
        case 'contract_signed':
          return 'started';
        case 'payment_done':
          return 'complete_done';
        default:
          return '';
      }
    },
    formatDate(date) {
      return moment(date).format('YYYY') || '';
    },
    formatProgress(paid, total) {
      return parseInt(parseInt(paid, 10) / parseInt(total, 10), 10);
    },
    onSelectedDealDetail(data) {
      this.$emit('selectedDealDetail', data);
    },
  },
};
</script>
<style lang="scss" scoped>
.no-lender {
  text-align: center;
  font-size: 15px;
  color: #93a0ae;
}

.deal-list {
  width: 100%;
  height: auto;
  max-height: 800px;
  overflow-y: auto;
  background: white;
  margin-top: -1px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  padding: 30px 20px;
  display: block;
  .deal-card {
    width: 100%;
    height: fit-content;
    background: lightgrey;
    margin-bottom: 30px;
    padding: 20px;
    box-shadow: 2px 4px 20px rgba(37, 50, 66, 0.17);
    border-radius: 10px;
    position: relative;
    color: #253242;
    cursor: pointer;
    .deal-status-icon {
      position: absolute;
      top: 8px;
      right: 20px;
      line-height: 12px;
      img {
        margin-top: -2px;
        width: 12px;
        height: 12px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
    .div-section {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: flex-start;
      .img-avatar {
        margin-right: 10px;
        img {
          width: 40px;
          height: 40px;
          min-width: 40px;
          // background-position: center;
          // background-repeat: no-repeat;
          // background-size: contain;
          border-radius: 50%;
          border: solid 1px #c4c4c4;
          aspect-ratio: 1;
          object-fit: contain;
        }
      }
      .div-content {
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        align-items: flex-start;
        .txt-title {
          font-size: 12px;
          margin-bottom: 6px;
        }
        .txt-date {
          font-size: 10px;
          color: #93a0ae;
          margin-bottom: 10px;
        }
        .amount-detail {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          .amount {
            display: flex;
            flex-flow: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding-right: 70px;
            margin-bottom: 10px;
            .txt-name {
              font-size: 10px;
              color: #93a0ae;
            }
            .txt-amount {
              font-size: 10px;
            }
          }
        }
      }
    }
    .deal-progress {
      width: 100%;
      .progress-intro {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        width: 100%;
        font-size: 10px;
        margin-bottom: 6px;
      }
      .progress-bar-container {
        border-radius: 10px;
      }
    }
    label {
      margin-top: 6px;
      font-size: 12px;
      line-height: 15px;
      font-weight: bold;
      color: #93a0ae;
    }
  }
  .no_started {
    background: linear-gradient(180deg, #fdf7ed 0%, #ffffff 100%);
  }
  .in_progress {
    background: linear-gradient(180deg, #f4f4f4 0%, #ffffff 100%);
  }
  .live {
    background: linear-gradient(180deg, #d8f0f7 0%, #ffffff 100%);
    .deal-status-icon {
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 10px solid #4289da;
    }
  }
  .accepted {
    background: linear-gradient(180deg, #eff6fc 0%, #ffffff 100%);
  }
  .started {
    background: linear-gradient(180deg, #eefff0 0%, #ffffff 100%);
    .deal-status-icon {
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 10px solid #05c491;
    }
  }
  .complete_done {
    background: linear-gradient(180deg, #daf9cf 0%, #ffffff 100%);
  }
}
</style>
