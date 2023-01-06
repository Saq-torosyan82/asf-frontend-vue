<template>
  <table>
    <slot />
  </table>
</template>

<script>
export default {};
</script>

<style scoped>
table {
  width: 100%;
}
td {
  font-size: 14px;
  text-align: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
td a {
  color: #3a9eba;
}

td input {
  background-color: #f6f6f6;
  border-radius: 4px;
  text-align: right;
  border: none;
  height: 30px;
  padding-right: 20px;
  max-width: 150px;
}
tbody tr:hover td:not([colspan='6']) {
  background-color: #f3f7fc;
}

tbody tr:first-child td {
  padding-top: 15px;
}
tbody tr:last-child td {
  padding-bottom: 15px;
}
tbody tr:last-child td {
  padding-bottom: 15px;
}
td:first-child {
  text-align: left;
  padding-left: 24px;
}
td:last-child {
  padding-right: 24px;
}
table thead {
  background-color: #f3f7fc;
  font-weight: 700;
  height: 58px;
}
table tr.bold td {
  font-weight: 700;
}
table hr {
  margin: 0;
}
</style>
