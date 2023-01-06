<template>
  <div class="input-wrap" :class="error ? 'valid-error' : ''">
    <label :for="name" class="label">{{ label }}</label>
    <slot></slot>
    <a @click="showPassword()"
      ><icon :show="icon" class="icon" :name="icon"
    /></a>
    <p v-show="error" class="error-message">
      {{ this.errorMsg }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  data: function () {
    return {
      typeOfInput: this.type,
    };
  },
  props: {
    icon: {
      type: String,
    },
    type: {
      type: String,
    },
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
  },
  methods: {
    showPassword() {
      if (this.typeOfInput === 'password') {
        this.typeOfInput = 'text';
      } else {
        this.typeOfInput = 'password';
      }
    },
  },
  components: {},
};
</script>
<style scoped>
label {
  font-size: 14px;
  font-weight: 600;
}

input {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  padding: 15.5px 16px;
  border: 1px solid #d9dfe5;
  border-radius: 4px;
  margin-top: 8px;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
}
input[type='date'] {
  background-color: white;
  color: #253242;
  height: 52px;
}
input[type='date']::placeholder {
  color: #707d8c;
}
input:focus {
  outline: none !important;
  border-color: var(--primary);
}

.input-wrap {
  position: relative;
}
/* In case of an error */
.valid-error input {
  border-color: #f61c0d;
}
.valid-error .vue-tel-input {
  border-color: #f61c0d;
}

.error-message {
  color: #f61c0d;
  font-size: 13px;
  font-weight: 700;
}

.icon {
  position: absolute;
  right: 16px;
  top: 55px;
  cursor: pointer;
}
/* Imported from Deal Calculator */
::v-deep .vdp-datepicker input {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  padding: 15.5px 16px;
  border: 1px solid #d9dfe5;
  border-radius: 4px;
  margin-top: 8px;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
@media only screen and (max-width: 700px) {
  .icon {
    top: 72px;
  }
}
</style>
