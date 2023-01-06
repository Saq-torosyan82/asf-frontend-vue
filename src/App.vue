<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<style lang="scss">
@import '@/assets/styles/_colors.scss';

//////////////////////////////////////
///// General
//////////////////////////////////////
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: all 0.25s ease-in-out;
}
body {
  -webkit-overflow-scrolling: touch;
}

#app {
  font-family: Mulish, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.inline {
  display: inline-flex;
  align-items: center;
}
a {
  cursor: pointer;
  text-decoration: none !important;
  &.button {
    color: white !important;
  }
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin: 0;
  padding: 0;
}
p.text {
  font-size: 12px;
  margin-bottom: 0;
}
.mt-48 {
  margin-top: 48px;
}
.mt-10 {
  margin-top: 10px;
}
.block {
  display: block;
}
.underline {
  text-decoration: underline;
}
.no-items {
  h5 {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #93a0ae;
  }
}
//Loading chart animation
canvas {
  transition: width 0s, height 0s;
}

//////////////////////////////////////
///// Scroll bar
//////////////////////////////////////
::-webkit-scrollbar {
  width: 5px;
  border-radius: 10px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: var(--primary);
}
::-webkit-scrollbar-thumb:hover {
  background: #3e8fa5;
}

//////////////////////////////////////
///// Inputs
//////////////////////////////////////

input[type='radio']:checked {
  box-shadow: 0px 0px 0px 5px var(--primary) inset;
  border: none;
  background-color: white;
}
input[type='radio'] {
  width: 17px;
  height: 17px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  padding: 6px;
  background-clip: content-box;
  border: 2px solid #d7dbdc;
  background-color: #e7e6e7;
  border-radius: 50%;
}
textarea {
  &:focus {
    outline-color: var(--primary);
  }
}

//////////////////////////////////////
///// Vuetify
//////////////////////////////////////

.v-application a {
  color: inherit;
}
.v-application .info {
  background: inherit !important;
}
.v-application .error {
  background-color: transparent !important;
  border-color: transparent !important;
}
.theme--light.v-application {
  background: transparent !important;
  color: inherit !important;
}

//////////////////////////////////////
///// Options CSS for Deals By Sort
//////////////////////////////////////

.v-autocomplete__content.v-menu__content {
  margin-top: 5px;

  box-shadow: 2px 4px 20px rgba(37, 50, 66, 0.17) !important;
  border-radius: 5px !important;
  border: 1px solid #f6f6f6;
  box-sizing: border-box;
  .v-sheet.v-list {
    max-height: 180px;
    .v-list-item {
      min-height: 25px;
      background: white;
      .v-avatar {
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .v-list-item__content {
        padding: 3px 0;
        text-transform: capitalize !important;
        .v-list-item__title {
          font-size: 12px;
          line-height: 15px;
          color: black;
        }
      }
    }
  }
}
.v-autocomplete__content.v-menu__content {
  --scrollbarBG: white;
  --thumbBG: #b6c3d1;
}
.v-autocomplete__content.v-menu__content::-webkit-scrollbar {
  width: 4px;
}
.v-autocomplete__content.v-menu__content {
  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
.v-autocomplete__content.v-menu__content::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}
.v-autocomplete__content.v-menu__content::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG);
  border-radius: 6px;
}
//////////////////////////////////
//////////////////////////////////
.dp-row {
  display: flex;
  flex-flow: row;
}
.dp-column {
  display: flex;
  flex-flow: column;
}

.nav-tabs {
  overflow-x: auto !important;
  white-space: nowrap !important;
  display: flex;
  flex-direction: row !important;
  flex-wrap: nowrap !important;

  li {
    display: inline-block !important;
  }
}
//////////////////////////////////////
///// Multiselect
//////////////////////////////////////
.multiselect {
  transition: none;
  * {
    transition: none;
  }
}
</style>
