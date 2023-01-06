<template>
  <div class="wrapper">
    <div class="left-section">
      <header class="left-section-header">
        <h1>Innovative funding solution for the global client base</h1>
        <h3>
          Assisting in leveraging and forward selling contractual receivable
          income to provide cashflow.
        </h3>
      </header>
      <div class="intro-steps">
        <h2>How it works:</h2>
        <div class="steps">
          <div class="step" v-for="(step, index) in introSteps" :key="index">
            <div class="step-number">
              <span>{{ index + 1 }}</span>
            </div>
            <h1>{{ step.headerText }}</h1>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content" align-v="center">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      introSteps: [
        {
          headerText: "Complete your profile",
          description: "Tell us more about you",
        },
        {
          headerText: "Use calculator fo find a perfect deal",
          description:
            "You can create a new deal or use a deal calculator to get a deal, customized for you",
        },
        {
          headerText: "Get analytics support on you financial state",
          description: "Track, get updates, and see analytics on your deals.",
        },
      ],
    };
  },
};
</script>
<style scoped>
@media only screen and (min-width: 700px) {
  .wrapper {
  }
  .content {
    margin-left: 555px;

    padding: 7em 0;
  }
  .left-section {
    max-width: 555px;
    width: 50%;
    height: 100%;
    background: linear-gradient(156.09deg, #d0e4fb -9.74%, #f3f7fc 111.18%);
    background-position: center;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .left-section-header {
    padding: 42px 80px;
    height: 206px;
  }
  .intro-steps {
    margin: 80px 0 0 80px;
  }
  .left-section-header h1 {
    font-size: 28px;
  }
  .left-section-header h3 {
    font-size: 16px;
  }
  .steps h1,
  .steps p {
    font-size: 14px;
  }
}
@media only screen and (max-width: 1100px) {
  .left-section {
    width: 25%;
  }
  .content {
    margin-left: 25%;
  }
  .left-section-header {
    padding: 42px 20px;
    height: auto;
  }
  .intro-steps {
    margin: 20px 0 0 20px;
  }
  .left-section-header h1 {
    font-size: 18px;
  }
  .left-section-header h3 {
    font-size: 14px;
  }

  .steps h1,
  .steps p {
    font-size: 13px;
  }
}

@media only screen and (max-width: 700px) {
  .content {
    margin-left: 0;
  }
  .left-section {
    display: none;
  }
}

/* GLOBAL */
.wrapper {
  background-color: white;
}

.left-section-header {
  background: #ffffff;
  box-shadow: 2px 4px 16px rgba(147, 160, 174, 0.2);

  margin-top: 80px;
  border-radius: 0 16px 16px 0;
}
.left-section-header h1 {
  font-weight: 700;
}
.left-section-header h3 {
  font-weight: 400;
}
/*Steps in left section*/

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
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: #72b1f0;
  background-color: white;
  border-radius: 50%;
}
.steps h1 {
  font-weight: 700;

  margin-bottom: 4px;
}
.steps p {
  font-weight: 400;
}
</style>
