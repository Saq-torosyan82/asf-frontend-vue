<template>
  <div class="deal-card" :class="cardData.type">
    <icon :name="cardData.type" class="status-icon" />
    <div class="deal-avatar">
      <img
        v-if="cardData.icon"
        :src="cardData.icon"
        alt="deal-avatar"
        class=""
      />
      <img
        v-else
        src="@/assets/img/Deal/default-deal.png"
        alt="deal-avatar"
        class=""
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DealCard',
  props: {
    cardData: Object,
  },
};
</script>

<style lang="scss">
deal-card:hover {
  cursor: pointer;
}

.deal-avatar {
  position: absolute;
  top: 15px;
  left: 10px;
  width: 55px;
  height: 55px;
  aspect-ratio: 1;
  /* object-fit: scale-down; */
  border-radius: 50%;
  background-color: white;
  overflow: hidden;
  display: grid;
  img {
    place-self: center;
    width: 70%;
    max-height: 70%;
    height: auto;
    object-fit: contain;
  }
}
.deal-card {
  ::v-deep {
    .content-info {
      flex-wrap: wrap;
      gap: 7px;
      label {
        white-space: nowrap;
      }
      p {
        white-space: nowrap;
      }
    }
    .deal-completion {
      white-space: nowrap;
    }
  }
}
/*
/////////////////////////////////////
// DEAL COMPLETION
/////////////////////////////////////
*/
.component.deal-completion {
  background: none;
  padding: 0;
}
.deal-completion .tabs {
  width: 100%;
}

.deal-completion .tab-header svg {
  float: right;
}
.deal-completion .deal-card {
  min-height: 140px;
  width: 100%;
  border-radius: 4px;
  padding: 20px 20px 10px;
  border: 1px solid #f6f6f6;
  box-shadow: 2px 3px 12px rgba(112, 125, 140, 0.15);
  margin-top: 20px;
  position: relative;
}
.deal-completion .status-icon {
  position: absolute;
  top: 10px;
  right: 20px;
}

.deal-completion .deal-card.paused {
  background: linear-gradient(180deg, #fceebd 0%, #ffffff 100%);
}
.deal-completion .deal-card.in-progress {
  background: linear-gradient(180deg, #e5e4e4 0%, #ffffff 100%);
}
.deal-completion .deal-card.future-deal {
  background: linear-gradient(180deg, #e5e4e4 0%, #ffffff 100%);
}
.deal-completion .deal-card.live {
  /* background: linear-gradient(180deg, #a0daea 0%, #ffffff 100%); */
  background: linear-gradient(180deg, #369eba 0%, #ffffff 100%);
}
.deal-completion .deal-card.accepted {
  background: linear-gradient(180deg, #f4fff2 0%, #afd9ff 0.01%, #f2fcff 100%);
}

.deal-completion .deal-card.started {
  background: linear-gradient(180deg, #f4fff2 0%, #ffffff 100%);
}
.deal-completion .deal-card.complete {
  background: linear-gradient(180deg, #daf9cf 0%, #ffffff 100%);
}

.deal-completion .deal-card .content-info {
  /* margin-left: 55px; */
  /* width: calc(100% - 90px); */
  width: calc(100% - 30px);
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 13px;
  & > * {
    &:first-child {
      flex-grow: 1;
      margin-left: 65px;
    }
  }
  .content-info-numbers {
    flex-grow: 1;
    gap: 15px;
    & > * {
      &:first-child {
        margin-left: 0;
      }
      margin-left: auto;
    }
  }
}
.deal-completion .deal-card .deal-header {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
}
.deal-completion .deal-card .deal-description {
  font-size: 11px;
  font-weight: 600;
  color: #93a0ae;
  margin-bottom: 0;
}
.deal-completion .deal-progress {
  font-size: 12px;
  font-weight: 600;
  margin: 10px auto 4px;
}
.deal-completion .deal-progress div:nth-of-type(2) {
  text-align: right;
}
.deal-progress .progress {
  width: 100%;
  margin: 0;
  height: 6px;
  background-color: #efefef;
}
.deal-completion a.upload-link {
  width: 100%;
  text-align: center;
  margin-top: 15px;
  display: block;
}

.deal-card .deal-reson {
  font-size: 12px;
  font-weight: bold;
  color: #93a0ae;
  text-align: center;
  margin: 10px 0 0px;
}
.deal-card .text-with-label {
  padding-bottom: 0;
}
.deal-card .text-with-label p {
  margin-bottom: 0 !important;
}

/*
/////////////////////////////////////
// MEDIA QUERIES
/////////////////////////////////////
*/

@media only screen and (max-width: 900px) {
  .deal-completion .deal-card {
    padding: 10px;
  }
  .deal-completion .deal-avatar {
    top: 10px;
  }
}
</style>
