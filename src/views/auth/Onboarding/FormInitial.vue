<template>
  <div>
    <CustomInput
      label="First name"
      name="first-name"
      errorMsg="First name is required"
      :error="
        !this.validatorProps.form.step1.firstName.required &&
        this.validatorProps.form.step1.firstName.$dirty
      "
    >
      <input
        type="text"
        v-model="wizardData.step1.firstName"
        placeholder="First name"
      />
    </CustomInput>

    <CustomInput
      label="Last name"
      name="last-name"
      errorMsg="Last name is required"
      :error="
        !this.validatorProps.form.step1.lastName.required &&
        this.validatorProps.form.step1.lastName.$dirty
      "
    >
      <input
        type="text"
        v-model="wizardData.step1.lastName"
        placeholder="Last name"
      />
    </CustomInput>

    <SelectInput
      label="User type"
      name="user-type"
      errorMsg="User type is required"
      :error="
        !this.validatorProps.form.step1.userType.required &&
        this.validatorProps.form.step1.userType.$dirty
      "
    >
      <select v-model="wizardData.step1.userType">
        <option value="" disabled selected hidden>Choose from the list</option>
        <option
          class="option"
          :value="{ id: type.id, category: type.type, name: type.name }"
          v-for="(type, i) in userTypes"
          :key="'type-' + i"
        >
          {{ type.label }}
        </option>
      </select>
    </SelectInput>
  </div>
</template>
<script>
//import SquareButton from "@/components/SquareButton.vue";
import CustomInput from '@/components/CustomInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
const SystemRepository = RepositoryFactory.get('system');

export default {
  name: 'FormInitial',
  components: {
    //SquareButton,
    CustomInput,
    SelectInput,
  },
  props: {
    wizardData: {
      type: Object,
      required: true,
    },
    validatorProps: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userTypes: [],
    };
  },
  methods: {
    getUserTypes() {
      SystemRepository.getBorrowerTypes()
        .then((response) => {
          this.userTypes = response.data.data;
        })
        .catch((error) => {
          this.userTypes = [];
          console.error(error);
        });
    },
  },
  mounted() {
    this.getUserTypes();
  },
};
</script>
