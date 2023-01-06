<template>
  <div class="wrap">
    <h3 class="sectionHeading mb-12">
      You have submitted your deal application
    </h3>
    <p class="sectionDescription">Here is what will happen next:</p>
    <div class="flow">
      <div class="element">
        <div class="number">1</div>
        <div class="text">
          <h5>SportsFi will review the application</h5>
          <p>
            The SportsFi legal and credit team will review your application. If
            there is any information missing from your application the system
            will notify you. Your relationship manager will schedule a call with
            relevant departments to discuss your application
          </p>
        </div>
      </div>
      <div class="element">
        <div class="number">2</div>
        <div class="text">
          <h5>
            Your application is approved and is submitted to Capital partners
          </h5>
          <p>
            Once the deal has been approved by the SportsFi legal and credit
            team
          </p>
        </div>
      </div>
      <div class="element">
        <div class="number">3</div>
        <div class="text">
          <h5>You will receive term sheets</h5>
          <p>
            Lenders that match your deal criteria will be requested to submit
            term sheets
          </p>
        </div>
      </div>
      <div class="element">
        <div class="number">4</div>
        <div class="text">
          <h5>Choose your offer</h5>
          <p>You can review terms and either accept or reject the terms</p>
        </div>
      </div>
      <div class="element">
        <div class="number">5</div>
        <div class="text">
          <h5>Draft contract will be issued</h5>
          <p>
            Contracts will be the legal counsel of the chosen capital provider
          </p>
        </div>
      </div>
      <div class="element">
        <div class="number">6</div>
        <div class="text">
          <h5>Sign and complete deal</h5>
          <p>
            You will receive funds within 2 business days, subject to banking
            compliance
          </p>
        </div>
      </div>
    </div>
    <div class="calculator-footer">
      <a class="next-step" href="/">Go to dashboard</a>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'FinalStep',
  components: {},
  methods: {},
};
</script>

<style scoped>
/*Steps in left section*/
@media only screen and (max-width: 750px) {
  .wrap {
    margin: 40px auto 0;
  }
  .element .text {
    text-align: left;
  }
}
.intro-steps {
  margin: 20px 0 0 20px;
}
h1 {
  font-size: 18px;
}
.intro-steps h2 {
  margin-bottom: 40px;
}
.step {
  position: relative;
  padding: 3px 0 0 40px;
  max-width: 365px;
}
.step-number span {
  vertical-align: middle;
  line-height: 24px;
}
.steps .step-number {
  background: linear-gradient(156.09deg, #d0e4fb -9.74%, #f3f7fc 111.18%);
  height: 28px;
}
.steps h1 {
  font-weight: 700;
  margin-bottom: 4px;
}
.steps p {
  font-weight: 400;
}

/** Final step */
.flow .element {
  margin-top: 40px;
}
p,
.flow h5,
.number {
  font-size: 14px;
}
.flow .number {
  position: absolute;
  display: grid;
  place-items: center;
  height: 24px;
  width: 24px;
  color: #72b1f0;
  font-weight: 700;
  border-radius: 100px;
  background: linear-gradient(156.09deg, #d0e4fb -9.74%, #f3f7fc 111.18%);
}
.flow .text {
  padding-left: 40px;
}
.flow .text h5 {
  font-weight: 700;
  margin-bottom: 4px;
}
.flow .text p {
  text-align: left;
  max-width: 100%;
  font-weight: 500;
}
</style>
