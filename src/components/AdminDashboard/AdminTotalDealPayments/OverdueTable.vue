<template>
  <div>
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
  </div>
</template>
<script>
export default {
  name: 'OverdueTable',
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
    min-width: 720px;
  }
  tbody {
    max-height: 150px;
    min-width: 720px;
  }
}
</style>
