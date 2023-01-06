<template>
  <div class="wrapper">
    <div class="image-section">
      <!-- <header class="image-section-header"> -->
      <!-- <h1>Innovative funding solution for the global client base</h1>
        <h3>
          Assisting in leveraging and forward selling contractual receivable
          income to provide cashflow.
        </h3> -->
      <!-- </header> -->
    </div>
    <div class="content" align-v="center">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
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
  .image-section {
    max-width: 555px;
    width: 50%;
    height: 100%;
    background-image: url('../../assets/img/onboarding-bg.png');
    background-position: 62%;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .image-section-header {
    height: 206px;
    padding: 42px 80px;
  }
  .image-section-header h1 {
    font-size: 28px;
  }
  .image-section-header h3 {
    font-size: 16px;
  }
}
@media only screen and (max-width: 1100px) {
  .image-section {
    width: 25%;
  }
  .content {
    margin-left: 25%;
  }
  .image-section-header {
    padding: 42px 20px;
    height: auto;
  }
  .image-section-header h1 {
    font-size: 18px;
  }
  .image-section-header h3 {
    font-size: 14px;
  }
}

@media only screen and (max-width: 700px) {
  .content {
    margin-left: 0;
  }
  .image-section {
    display: none;
  }
}

/* GLOBAL */
.wrapper {
  background-color: white;
}

.image-section-header {
  background: #ffffff;
  box-shadow: 2px 4px 16px rgba(147, 160, 174, 0.2);

  margin-top: 80px;
  border-radius: 0 16px 16px 0;
}
.image-section-header h1 {
  font-weight: 700;
}
.image-section-header h3 {
  font-weight: 400;
}
</style>
