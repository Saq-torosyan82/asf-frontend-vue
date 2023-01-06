<template>
  <div class="content-wrapper">
    <!--    <BaseModal modalType="success" email="custom@gmail.com"></BaseModal>-->
    <LogoImage class="logo-image" />
    <h1>Get a one time code</h1>
    <h3>
      <router-link to="/register">Back to login page</router-link>
    </h3>

    <p class="description">
      We will email you a one time code that you will use to sign in
    </p>
    <p class="lender-email">user@mail.com</p>

    <SquareButton type="submit" background="#3a9eba" color="white"
      >Send me the code</SquareButton
    >
    <DividerWithText>or</DividerWithText>

    <SquareButton type="submit" background="white" color="#253242"
      >Use password instead</SquareButton
    >
  </div>
</template>

<script>
import LogoImage from '@/assets/icons/logo-blue.svg';
import SquareButton from '@/components/SquareButton.vue';
import DividerWithText from '@/components/DividerWithText.vue';
export default {
  components: {
    LogoImage,
    SquareButton,
    DividerWithText,
  },
};
</script>

<style lang="css" scoped>
/* DESKTOP ONLY */
@media only screen and (min-width: 700px) {
  .content-wrapper {
    max-width: 480px;
    margin: auto;
  }
}
/* MOBILE ONLY */
@media only screen and (max-width: 700px) {
  .content-wrapper {
    padding: 60px 24px 60px;
  }
}

/* GLOBAL */

.content-wrapper {
  color: #253242;
}
svg.logo-image {
  width: 140px;
  height: auto;
}

.content-wrapper h1 {
  font-size: 28px;
  font-weight: bold;
  margin-top: 48px;
  margin-bottom: 16px;
}
.content-wrapper h3 {
  font-size: 14px;
  font-weight: 600;
}
.content-wrapper h3 a {
  color: #3a9eba;
  font-weight: 700;
  text-decoration: none;
}

.description {
  font-size: 14px;
  font-weight: 600;
  margin-top: 20px;
}
.lender-email {
  font-weight: 600;
  margin-bottom: 32px;
}
</style>
