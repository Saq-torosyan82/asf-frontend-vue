<template>
  <table>
    <thead class="thead-scroll-width">
      <tr>
        <td v-for="col in cols" :key="col">
          <span>{{ col }}</span>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="(col, index) in cols" :key="index">
          {{ row[col] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'PaymentsTable',
  props: {
    cols: {
      type: Array,
      default: new Array(),
    },
    rows: {
      type: Array,
      default: new Array(),
    },
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/default-table.scss"
></style>
<style lang="scss" scoped>
table {
  thead {
    min-width: 920px;
  }
  tbody {
    max-height: 340px;
    min-width: 920px;
    tr:last-child {
      border-top: 2px solid #93a0ae;
      td {
        font-size: 14px;
        line-height: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
