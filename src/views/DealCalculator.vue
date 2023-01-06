<template>
  <div class="content-wrapper">
    <HeaderNavigation />
    <div class="breadcrumbs">
      <router-link to="/">Dashboard</router-link>
      <span> > </span>
      <router-link to="/dealcalculator" class="current"
        >Deal calculator</router-link
      >
    </div>
    <div class="calculator-wrapper">
      <Steps></Steps>

      <FirstStep v-if="currentStep == 1"></FirstStep>

      <SecondStep v-if="currentStep == 2"></SecondStep>

      <ThirdStep v-if="currentStep == 3"></ThirdStep>

      <FourthStep v-if="currentStep == 4"></FourthStep>

      <FifthStep v-if="currentStep == 5"></FifthStep>

      <SixthStep v-if="currentStep == 6"></SixthStep>

      <SeventhStep v-if="currentStep == 7"></SeventhStep>

      <FinalStep v-if="currentStep == 8"></FinalStep>
    </div>
  </div>
</template>
<script>
import store from '@/store';
import StepsNavigationMixin from '@/mixins/DealCalculator/StepsNavigation.mixin';

import HeaderNavigation from '@/components/HeaderNavigation.vue';
import FirstStep from './DealCalculator/Stepts/FirstStep';
import SecondStep from './DealCalculator/Stepts/SecondStep';
import Steps from './DealCalculator/layouts/Steps';
import ThirdStep from './DealCalculator/Stepts/ThirdStep';
import FourthStep from './DealCalculator/Stepts/FourthStep';
import FifthStep from './DealCalculator/Stepts/FifthStep';
import SixthStep from './DealCalculator/Stepts/SixthStep';
import SeventhStep from './DealCalculator/Stepts/SeventhStep';
import FinalStep from './DealCalculator/Stepts/FinalStep';

export default {
  components: {
    HeaderNavigation,
    FirstStep,
    Steps,
    SecondStep,
    ThirdStep,
    FourthStep,
    FifthStep,
    SixthStep,
    SeventhStep,
    FinalStep,
  },
  mixins: [StepsNavigationMixin],
  mounted() {},

  data: function () {
    return {
      leagueSelected: false,
      steps: [
        'Deal information',
        'Second party',
        'Contract information',
        'Payment schedule',
        'Document upload',
        'Confirmations',
      ],
    };
  },
  computed: {
    currentStep() {
      return store.getters['dealCalculator/getStep'];
    },
  },
  watch: {
    currentStep(newValue, oldValue) {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss">
.payment__table .error-message {
  position: absolute;
}
.payment-dates .error .label {
  display: none;
}
.error a {
  margin-left: 0 !important;
}
.error p {
  margin-bottom: 0 !important;
}
.error .vdp-datepicker input {
  border-color: #f61c0d;
}
.step-name:hover {
  cursor: pointer;
}
/* Transfer to custom input */
.vdp-datepicker input {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  padding: 15.5px 16px;
  border: 1px solid #d9dfe5;
  border-radius: 4px;
  /* margin-top: 0px; */
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
label {
  display: initial;
}
@media only screen and (max-width: 1150px) {
  /** Step 4 */
  .payment {
    overflow-x: auto;
    padding-bottom: 20px;
  }

  .payment__table__wrapper {
    overflow-x: auto;
  }

  .payment__table td {
    min-width: 120px;
  }

  .payment__table td:last-child {
    min-width: 160px !important;
  }
}

@media only screen and (min-width: 750px) {
  .content-wrapper {
    margin-left: 163px;
    padding: 24px 30px 50px;
  }
  .calculator-wrapper {
    margin-top: 40px;
  }
  /** Header navigation */
  .breadcrumbs {
    position: absolute;
    top: 25px;
  }

  /** Steps */
  .step {
    margin-bottom: 40px;
  }
  .step-number.step-number {
    margin-right: 23px;
  }

  /** Step 2 */
  .selectionBody {
    grid-template-columns: repeat(4, 1fr);
  }
  .selectionItem,
  .selectionItem p {
    text-align: center;
    max-width: 120px;
  }
  .selectionItem {
    justify-self: left;
  }
  .selectionItem.selected {
    grid-column: 1 / 5;
  }
  .deal-info p {
    text-align: left;
    display: inline-block;
    margin-right: 50px;
  }
  .next-step {
    margin-right: 30px;
  }
  /** Step 3 */

  .contact-info {
    margin: 10px auto 0 30px;
  }
  /** Step 5 */
  .sectionDescription {
    text-align: left;
    max-width: 450px;
  }
}
@media only screen and (max-width: 750px) {
  .content-wrapper {
    padding: 84px 20px 40px;
  }

  .document-upload .document-list .document {
    flex-direction: row;
  }

  .sectionDescription {
    text-align: left;
    max-width: 450px;
  }

  .calculator-wrapper {
    margin-top: 20px;
    flex-direction: column;
    text-align: center;
  }
  .calculator {
    width: 100%;
    margin-top: 46px;
  }

  /** Steps */
  .steps {
    padding: 0 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly !important;
  }
  .step {
    padding: 0 10px;
    flex-direction: column;
    margin-bottom: 0;
  }
  .step p {
    margin-top: 5px;
  }
  .step-number.step-number {
    margin-right: 0;
  }
  .step-number::after {
    display: none;
  }
  /** Step 3 */

  .contact-info {
    margin: 30px auto 0;
  }
  /** step 4 */
  .payment {
    margin-top: 46px;
  }
  .payment__table__wrapper {
    width: calc(100vw - 230px);
    padding: 0 50px 20px 20px;
  }

  .sectionDescription {
    max-width: 100%;
    text-align: center;
  }

  /**Inputs */
  .radio__input:first-of-type {
    margin-left: 20px !important;
  }
  /** Step 2 */
  .selectionItem {
    justify-self: center;
  }
  .selectionItem,
  p {
    text-align: center;
    max-width: 100%;
  }
  .selectionBody {
    grid-template-columns: repeat(3, 1fr);
  }
  .selectionItem.selected {
    grid-column: 1 / 4;
  }

  .deal-info p {
    text-align: center !important;
    display: block !important;
    margin-right: 0;
  }
  /** Step 3 */
  .contact-info {
    width: 90%;
    margin: 30px 5% 0;
  }
  /** step 4 */
  .payment {
    overflow-x: hidden;
    margin-top: 46px;
  }
  .payment__table__wrapper {
    padding: 0 50px 20px 20px;
    overflow-x: auto;
    width: calc(100vw - 40px);
  }

  .sectionDescription {
    max-width: 100%;
    text-align: center;
  }

  .next-step {
    width: 100%;
    margin-bottom: 30px;
  }
  .document-upload .document-list .document {
    flex-direction: row;
  }
  .document-upload .back-link {
    margin-top: 24px;
  }
}
@media only screen and (max-width: 560px) {
  .selectionBody {
    grid-template-columns: repeat(2, 1fr);
  }
  .selectionItem.selected {
    grid-column: 1 / 3;
  }
  .document-upload .document-list .document {
    flex-direction: column;
  }
  .document-upload .document-list .upload-button {
    margin-top: 15px;
    margin-left: 0;
  }
}

.content-wrapper {
  background-color: white;
  height: 100%;
  min-height: 100vh;
}
/* Breadcrumbs */

.breadcrumbs * {
  margin-right: 8px;
}
.breadcrumbs,
.breadcrumbs a {
  font-size: 16px;
  font-weight: 600;
  color: #93a0ae;
}
.breadcrumbs a.current {
  color: #253242;
}

a {
  text-decoration: none;
  cursor: pointer;
}
a.back-link {
  display: block;
  font-size: 14px;
  color: #707d8c;
  font-weight: 600;
  margin-bottom: 20px;
}
a.back-link svg {
  margin-bottom: 3px;
}

h3.sectionHeading {
  margin-bottom: 32px;
}
h3.sectionHeading.mb-12 {
  margin-bottom: 12px !important;
}
h3.inputHeading {
  margin-top: 48px;
}
h3.sectionHeading,
h3.inputHeading {
  font-size: 16px;
  font-weight: 600;
  color: #253242;
}
h3.sectionHeading:not(:first-of-type) {
  margin-top: 48px;
}

.content-wrapper p {
  font-size: 12px;
  font-weight: 600;
  color: #707d8c;
}
.pl-17.pl-17 {
  padding-left: 17px;
}

/** Header navigation edit */
::v-deep .menu-wrap {
  width: 100%;
  justify-content: flex-end;
}
::v-deep h2.header-navigation-title {
  display: none;
}
::v-deep .search-input {
  display: none;
}
/* placeholder text style */
input[type='date'] {
  background-color: white;
  color: #253242;
  height: 52px;
}
input[type='date']::placeholder {
  color: #707d8c;
}

/**** Calculator *******/
.calculator-wrapper {
  display: flex;
  align-items: flex-start;
  /*flex-wrap: wrap;*/
}

/*Steps on the left*/
.steps {
  min-width: 165px;
  margin-right: 30px;
  position: sticky;
  top: 100px;
}
.step {
  display: flex;
  align-items: center;

  position: relative;
}
.step.current .step-number {
  color: #253242;
  background-color: #dbe7f4;
  border: 1px solid #dbe7f4;
}
.step .step-number {
  width: 28px;
  line-height: 26px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid #93a0ae;
  font-size: 12px;
  font-weight: 700;
  color: #707d8c;
  position: relative;
}
.step.current p,
.step.complete p {
  color: #253242;
}
.step p {
  margin: 0 0 0 0;
}
.step.complete svg {
  display: initial;
}
.step svg {
  z-index: 10;
  position: absolute;
  inset: -2px;

  width: 30px;
  height: 30px;
  display: none;
}

.step:not(:last-child) .step-number::after {
  content: '';
  position: absolute;
  border: 1px solid #d9dfe5;
  height: 28px;
  top: 34px;
  left: 12.5px;
}
/* Calculator content */
.radio-input {
  margin-right: 12px;
}

input[type='radio'] {
  margin-bottom: 2.5px;
  vertical-align: middle;
}
input[type='radio']:checked + label {
  color: #253242;
}
.radio__input {
  display: inline-block;
  margin: 0 20px;
}
.radio__input:first-of-type {
  margin-left: 0;
}
.radio__input label {
  font-size: 14px;
}
.calculator {
  flex-basis: 270px;
  flex-grow: 1;
}
.calculator-footer {
  margin-top: 56px;
}

a.next-step {
  display: inline-block;
  padding: 17px 32px;
  color: white;
  background: var(--main-gradient);
  background-size: 200%;
  background-position: left;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.7s ease-in-out;
}
a.next-step:hover {
  background-position: right;
}

a.next-step.save-later {
  background: white;
  color: var(--primary);
}
/** Step 2 */
.selectionBody {
  display: grid;
  max-width: 792px;
  gap: 40px 15px;
}
.selectionBody p {
  margin: 8px auto 0;
  min-height: 36px;
}
.selectionItem {
  cursor: pointer;
  align-self: center;
}
.selectionItem {
  &:hover {
    .image {
      border: 1px solid #a6aaac;
    }
  }
  .image {
    border-radius: 100%;
    border: 1px solid #e0e3e4;
    padding: 20px;
    width: 120px;
    min-width: 120px;
    min-height: 120px;
    height: 120px;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
  }
  img {
    aspect-ratio: 1;
    object-fit: contain;
  }
}

.selectionItem.selected {
  display: block;
  min-width: 200px;
  margin-bottom: 20px;
  cursor: initial;
}
.selectionItem.selected p {
  min-width: 200px;
}
.selectionItem.selected img {
  padding: 3px;
  border: 1px solid transparent;
  border-radius: 80px;
  background-image: linear-gradient(311.49deg, #f09814 10.16%, #fef51e 92.91%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

/** Step 4 */

/** Table */

table.payment__table {
  border-collapse: collapse;
  text-align: left;
}

.payment__table input {
  margin-top: 0px;
  width: 150px;
}
.payment__table thead {
  font-weight: 600;
}
.payment__table thead td {
  padding: 0 22px 12px 0;
}

.payment__table td:nth-child(4),
.payment__table td:nth-child(5),
.payment__table td:nth-child(6),
.payment__table td:nth-child(6) input,
.payment__table td:nth-child(7) {
  text-align: right;
}

.payment__table td {
  font-size: 14px;
  padding: 0 25px 12px 0;
}

.payment__table td:first-of-type {
  max-width: 40px;
  text-align: left;
}
.payment__table td a {
  font-weight: 700;
  color: var(--primary);
}
.payment__table td a:last-child {
  color: #f61c0d;
  margin-left: 24px;
}
/** Table footer */
.total td,
.forwarding-cost td {
  font-weight: 600;
}
.total td {
  padding-top: 15px;
  padding-bottom: 15px;
}
.capital-fee td {
  padding-top: 15px;
}
.forwarding-cost td {
  padding-bottom: 15px;
}
.amount-charged td {
  font-weight: 700;
  padding-top: 15px;
}

/** Document upload */
p.sectionDescription {
  font-size: 14px;
}
.document-upload .document-list {
  margin-top: 32px;
}

.document-upload .document-list .document {
  display: flex;
  gap: 40px;
  width: 100%;
  margin-bottom: 32px;
  justify-content: space-evenly;
}
.document-upload .document-list .document h5 {
  flex-grow: 1;
  margin-bottom: 0;
  font-size: 16px;
  color: #707d8c;
  font-weight: 700;
  text-align: left;
}
.document-upload .upload-button {
  padding: 20px 40px;
  border: 1px dashed #b6c3d1;
  border-radius: 6px;
  box-shadow: 2px 3px 12px rgba(112, 125, 140, 0.15);
  /* margin-left: auto; */
  font-size: 14px;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  &:hover {
    cursor: pointer;
  }
}
.document-upload .upload-button span {
  color: #707d8c;
}
.document-upload .upload-button svg {
  margin-right: 10px;
}
.document-upload .upload-button strong {
  margin-right: 5px;
  color: var(--primary);
}
.document-upload .upload-button input {
  opacity: 0;
  position: absolute;
  inset: 0;
  width: 100%;
}
.confirmation {
  background-color: #f3f7fc;
  border-radius: 8px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  /* max-width: 650px; */
}
.confirmation input {
  position: absolute;
  //margin-top: 2px;
}
.confirmation label {
  display: inline-block;
  font-size: 12px;
  text-align: left;
  padding-left: 32px;
}
</style>
