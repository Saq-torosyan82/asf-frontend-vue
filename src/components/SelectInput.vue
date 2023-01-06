<template>
  <div class="input-wrap" :class="error ? 'error' : ''">
    <label :for="name" class="label">{{ label }}</label>
    <span class="input-wrap">
      <slot></slot>
      <span v-show="!noArrow" class="custom-arrow"></span>
    </span>
    <p v-show="error" class="error-message">
      {{ errorMsg }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
    },
    error: {
      type: Boolean,
    },
    errorMsg: {
      type: String,
    },
    noArrow: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
label {
  font-size: 14px;
  font-weight: 600;
}
.input-wrap {
  position: relative;
}
select {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  padding: 15.5px 16px;
  border: 1px solid #d9dfe5;
  border-radius: 4px;
  margin-top: 8px;
  color: #757587;
  appearance: none;
}
/* Dropdown arrow */
.custom-arrow {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 0.6em solid transparent;
  border-right: 0.6em solid transparent;
  border-top: 0.6em solid #253242;
  top: 8px;
  right: 23px;
  border-radius: 3px;
}

select:focus {
  outline: none !important;
  border-color: var(--primary);
}

/* In case of an error */
.error select {
  border-color: #f61c0d;
}
.error /deep/select {
  border-color: #f61c0d !important;
}

.error-message {
  color: #f61c0d;
  font-size: 13px;
  font-weight: 700;
  margin: 0;
}
</style>
