<template>
  <div class="payment-table">
    <table>
      <thead>
        <tr>
          <!-- Col For Index -->
          <td></td>
          <!--  -->
          <td v-for="col in cols" :key="col">
            <span>{{ col }}</span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td style="width: 5%">{{ index + 1 }}.</td>
          <td style="width: 25%">{{ row.Date }}</td>
          <td style="width: 30%">
            <div class="t_cell">
              <div
                class="icon-status"
                :style="{ background: statusColor[row.Status] || '' }"
              ></div>
              {{ row.Status }}
            </div>
          </td>
          <td>{{ currency }}{{ row['Gross amounts'] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    rows: {
      type: Array,
      default: new Array(),
    },
    currency: {
      type: String,
      default: new String(),
    },
  },
  data() {
    return {
      cols: ['Date', 'Status', 'Gross amounts'],
      statusColor: { Received: '#76E150', Pending: '#72B1F0' },
    };
  },
};
</script>
<style lang="scss" scoped>
.payment-table {
  font-weight: normal;
  font-size: 12px;
  line-height: 13px;
  color: #253242;
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    thead {
      td {
        padding: 9px 0;
      }
      td:nth-child(2) {
        text-align: right;
        padding-right: 25px;
      }
      td:last-child {
        text-align: right;
      }
    }
    tbody {
      tr {
        td {
          padding: 8px 0;
          .t_cell {
            display: flex;
            flex-flow: row;
            align-items: center;
            .icon-status {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              margin-right: 8px;
            }
          }
        }
        td:nth-child(2) {
          text-align: right;
          padding-right: 25px;
        }
        td:last-child {
          text-align: right;
        }
      }
    }
  }
}
</style>
