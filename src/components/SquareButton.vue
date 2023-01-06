<template>
  <button
    :style="{ background, color, maxWidth }"
    :class="{ disabled: disabled }"
    :disabled="disabled"
  >
    <icon :show="icon" class="icon" :name="this.icon" />
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "SquareButton",
  props: {
    icon: {
      type: String,
    },
    color: {
      type: String,
    },
    background: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    maxWidth: {
      type: String,
    },
  },

  components: {},
};
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Mulish !important;
  background-color: none;
  color: none;
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 15px;
  box-shadow: 2px 2px 20px rgba(147, 160, 174, 0.3);
}

button.disabled {
  background-color: #b6daff !important;
}

button svg {
  margin-right: 10px;
}
</style>
