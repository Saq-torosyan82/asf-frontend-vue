<template>
  <div class="documents-table">
    <table>
      <thead>
        <tr>
          <td v-for="col in cols" :key="col">
            <span>{{ col }}</span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td style="width: 50%">{{ row.Type }}</td>
          <td style="width: 25%">{{ row['Upload date'] }}</td>
          <td>
            <div class="t_cell">
              <div
                class="icon-status"
                :style="{ background: statusColor[row.Status] || '' }"
              ></div>
              {{ row.Status }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="description">
      <span class="txt-title">View</span>
      <div class="div-content">
        <img src="@/assets/img/documents_icon.png" class="icon-documents" />
        <span class="txt-title">Download</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rows: {
      type: Array,
      default: new Array(),
    },
  },
  data() {
    return {
      cols: ['Type', 'Upload date', 'Status'],
      statusColor: { Verified: '#76E150', Pending: '#72B1F0' },
    };
  },
};
</script>
<style lang="scss" scoped>
.documents-table {
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
        // padding-right: 10px;
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
            justify-content: flex-end;
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
          // padding-right: 10px;
        }
        td:last-child {
          text-align: right;
        }
      }
    }
  }
  .description {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
    .txt-title {
      font-weight: bold;
      color: #3a9eba;
      cursor: pointer;
    }
    .div-content {
      margin-left: 15px;
      display: flex;

      align-items: center;
      cursor: pointer;
      .txt-title {
        padding-left: 6px;
      }
    }
  }
}
</style>
