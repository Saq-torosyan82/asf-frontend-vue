<template>
  <div class="input-wrap">
    <label :for="name" class="label">{{ label }}</label>

    <input
      :class="{ valid_error: error }"
      :name="name"
      :type="typeOfInput"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <a @click="showPassword()"
      ><icon :show="icon" class="icon" :name="icon"
    /></a>

    <p v-show="error" class="error-message">
      {{ errorMsg }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'InputSimple',
  data: function () {
    return {
      typeOfInput: this.type,
    };
  },
  props: {
    icon: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },

    disabled: {
      type: Boolean,
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
  padding: 17px 16px;
  border: 1px solid #d9dfe5;
  border-radius: 4px;
  margin-top: 8px;
}
input:focus {
  outline: none !important;
  border-color: #4289da;
}

.input-wrap {
  position: relative;
}
.icon {
  position: absolute;
  right: 16px;
  top: 55px;
  cursor: pointer;
}
/* In case of an error */
input.valid_error {
  border-color: #f61c0d;
}
.error-message {
  color: #f61c0d;
  font-size: 13px;
  font-weight: 700;
}
@media only screen and (max-width: 700px) {
  .icon {
    top: 72px;
  }
}
</style>
