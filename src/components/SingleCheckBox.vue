<template>
  <div class="checkbox">
    <input id="check-box" type="checkbox" />
    <label for="checkbox"><slot /></label>
  </div>
</template>
<style>
.checkbox {
  display: inline-flex;
  align-items: flex-start;
  padding: 16px 24px;
  background: #f3f7fc;
  border-radius: 8px;
}
#check-box {
  margin: 2px 12px 0 0;
}
.checkbox label {
  color: #253242;
  font-size: 12px;
}
</style>
