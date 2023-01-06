<template>
  <div>
    <div v-if="this.currentStep == 2">
      <CustomInput
        label="Phone number"
        name="phone-number"
        rrorMsg="Phone number number is required"
        :error="
          !this.validatorProps.form.agent.step2.agentPhoneNumber.required &&
          this.validatorProps.form.agent.step2.agentPhoneNumber.$dirty
        "
      >
        <vue-tel-input
          v-model="wizardData.agent.step2.agentPhoneNumber"
        ></vue-tel-input>
      </CustomInput>
      <CustomInput
        label="Office number"
        name="office-number"
        errorMsg="Office number number is required"
        :error="
          !this.validatorProps.form.agent.step2.agenctOfficeNumber.required &&
          this.validatorProps.form.agent.step2.agenctOfficeNumber.$dirty
        "
      >
        <vue-tel-input
          v-model="wizardData.agent.step2.agenctOfficeNumber"
        ></vue-tel-input>
      </CustomInput>

      <CustomInput
        label="Company registration number"
        name="company-number"
        errorMsg="Company registration number is required"
        :error="
          !this.validatorProps.form.agent.step2.agentCompanyRegNumber
            .required &&
          this.validatorProps.form.agent.step2.agentCompanyRegNumber.$dirty
        "
      >
        <input
          type="text"
          placeholder="Company number"
          v-model="wizardData.agent.step2.agentCompanyRegNumber"
        />
      </CustomInput>
    </div>

    <div v-if="this.currentStep == 3">
      <CustomInput
        label="Company name"
        name="company-name"
        errorMsg="Company name is required"
        :error="
          !this.validatorProps.form.agent.step3.agentCompanyName.required &&
          this.validatorProps.form.agent.step3.agentCompanyName.$dirty
        "
      >
        <input
          type="text"
          placeholder="Company name"
          v-model="wizardData.agent.step3.agentCompanyName"
        />
      </CustomInput>

      <SelectInput
        label="Country"
        name="country"
        errorMsg="Country is required"
        :error="
          !this.validatorProps.form.agent.step3.agentCountry.required &&
          this.validatorProps.form.agent.step3.agentCountry.$dirty
        "
      >
        <select v-model="wizardData.agent.step3.agentCountry">
          <option value="" disabled selected hidden>
            Choose your country from the list
          </option>
          <option
            v-for="(country, i) in allCountries"
            :key="'country-' + i"
            class="option"
            :value="country.id"
          >
            {{ country.name }}
          </option>
        </select>
      </SelectInput>
      <CustomInput
        label="Street address"
        name="street-address"
        errorMsg="Street address is required"
        :error="
          !this.validatorProps.form.agent.step3.agentStreetAddress.required &&
          this.validatorProps.form.agent.step3.agentStreetAddress.$dirty
        "
      >
        <input
          type="text"
          placeholder="Street address"
          v-model="wizardData.agent.step3.agentStreetAddress"
        />
      </CustomInput>
      <b-row>
        <b-col
          ><CustomInput label="State (optional)" name="state">
            <input
              type="text"
              placeholder="State"
              v-model="wizardData.agent.step3.agentState"
            /> </CustomInput
        ></b-col>
        <b-col
          ><CustomInput
            label="City"
            name="City"
            errorMsg="City is required"
            :error="
              !this.validatorProps.form.agent.step3.agentCity.required &&
              this.validatorProps.form.agent.step3.agentCity.$dirty
            "
          >
            <input
              type="text"
              placeholder="City"
              v-model="wizardData.agent.step3.agentCity"
            /> </CustomInput
        ></b-col>
        <b-col
          ><CustomInput
            label="ZIP - Post code"
            name="zipcode"
            errorMsg="Zip code is required"
            :error="
              !this.validatorProps.form.agent.step3.agentZip.required &&
              this.validatorProps.form.agent.step3.agentZip.$dirty
            "
          >
            <input
              type="text"
              placeholder="Post code"
              v-model="wizardData.agent.step3.agentZip"
            /> </CustomInput
        ></b-col>
      </b-row>
    </div>

    <div v-if="this.currentStep == 4">
      <SelectInput
        label="Sport (please choose multiple if applicable)"
        name="Sport"
        errorMsg="Sport is required"
        :error="
          !this.validatorProps.form.agent.step4.agentSport.required &&
          this.validatorProps.form.agent.step4.agentSport.$dirty
        "
        :noArrow="true"
      >
        <MultiSelect
          :options="options"
          v-model="wizardData.agent.step4.agentSport"
          @checked="onCheck"
        ></MultiSelect>
      </SelectInput>
    </div>
  </div>
</template>
<script>
//import SquareButton from "@/components/SquareButton.vue";
import CustomInput from '@/components/CustomInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import MultiSelect from '@/components/MultiSelect.vue';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
const SystemRepository = RepositoryFactory.get('system');

export default {
  name: 'FormAgent',
  components: {
    //SquareButton,
    CustomInput,
    SelectInput,
    MultiSelect,
    // VueTelInput,
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
    currentStep: { type: Number, required: true },
  },
  methods: {
    getCountries() {
      let $this = this;
      SystemRepository.getCountries()
        .then((response) => {
          $this.allCountries = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getSports() {
      let $this = this;
      SystemRepository.getSports()
        .then((response) => {
          $this.sports = response.data.data;
          var data = response.data.data;
          data.forEach((sport) => {
            this.options.push({
              text: sport.name,
              value: sport.id,
            });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    onCheck(val) {
      this.wizardData.agent.step4.agentSport = val;
      this.selected = val;
    },
  },

  data() {
    return {
      allCountries: [],
      selected: [],
      options: [],
    };
  },
  mounted() {
    this.getCountries();
    this.getSports();
  },
};
</script>
