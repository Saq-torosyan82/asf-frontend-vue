<template>
  <div>
    <div
      class="dropdown"
      :class="this.show ? 'show' : ''"
      @click="showDropdown"
    >
      <div class="overselect"></div>
      <select class="c-form-input">
        <option value="">
          {{
            selected.length == 0 ? 'Choose from the list' : getSelectedText()
          }}
        </option>
      </select>
      <span class="custom-arrow"></span>
    </div>
    <div class="multiselect" :class="this.show ? 'show' : ''" v-if="show">
      <ul>
        <li v-for="(option, index) in options" :key="index">
          <input
            type="checkbox"
            :id="index"
            :value="{ id: option.value, text: option.text }"
            v-model="selected"
          />
          <label :for="index">{{ option.text }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiSelect',
  props: ['options'],
  data() {
    return {
      show: false,
      selected: [],
      selectedText: [],
    };
  },
  methods: {
    showDropdown() {
      this.show = !this.show;
    },
    getSelectedText() {
      return this.selectedText.join(', ');
    },
  },
  watch: {
    selected(value) {
      var ids = [];
      var text = [];

      value.forEach((element) => {
        ids.push(element.id);
        text.push(element.text);
      });

      this.$emit('checked', ids);
      this.selectedText = text;
    },
  },
};
</script>

<style scoped>
* {
  font-family: mulish;
  font-size: 14px;
  color: #757575;
}

.col {
  flex: 0 0 50%;
  max-width: 50%;
  padding-left: 1rem;
  padding-right: 1rem;
}

/*****
- MultiSelect 
*****/

.dropdown {
  position: relative;
  cursor: pointer;
  margin-top: 10px;
}
.dropdown.show select {
  border-color: #4289da;
  border-radius: 4px 4px 0 0;
}
.dropdown.show .custom-arrow {
  transform: rotate(180deg);
}
.multiselect.show ul {
  box-shadow: 2px 4px 20px rgba(37, 50, 66, 0.17);
}

select {
  width: 100%;
  border: 1px solid #d9dfe5;
  border-radius: 4px;
  height: 54px;
  padding: 16px;
  font-size: 14px;
  font-weight: 600;
  appearance: none;
}
.custom-arrow {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 0.6em solid transparent;
  border-right: 0.6em solid transparent;
  border-top: 0.6em solid #253242;
  top: 23px;
  right: 23px;
  border-radius: 3px;
}
.multiselect {
  position: relative;
  z-index: 50;
}
.multiselect li:first-of-type {
  margin-top: 0;
}
.multiselect li {
  margin: 16px 0;
  display: flex;
  align-items: center-;
}
.multiselect ul {
  position: absolute;
  left: 0px;
  top: 4px;
  width: 100%;
  max-height: 260px;
  padding: 20px 20px 0 20px;
  background-color: white;
  border-radius: 4px;
  overflow: auto;
  list-style: none;
}
.multiselect label {
  color: #253242;
  margin-left: 12px;
  line-height: 22px;
}
input[type='checkbox'] {
  border-radius: 10px;
  color: red;
  border-color: red;
  height: 21px;
  display: inline;
}
.overselect {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
