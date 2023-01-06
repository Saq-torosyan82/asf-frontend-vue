<template>
  <div class="divider">
    <hr class="left" />
    <span>
      <slot></slot>
    </span>
    <hr class="right" />
  </div>
</template>

<script>
export default {
  name: "DividerWithText",
};
</script>

<style scoped>
@media only screen and (max-height: 1200px) {
  .divider {
    margin: 12px 0px;
  }
}

.divider {
  display: flex !important;
  align-items: center;
  text-align: center;
  margin: 32px 0px;
  color: #b6c3d1;
}
.divider span {
  flex-grow: 1;
}
.divider hr {
  background-color: #b6c3d1;
  height: 1px;
  border: 0;
  width: 42%;
}
</style>
