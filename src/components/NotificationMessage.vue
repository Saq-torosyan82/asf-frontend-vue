<template>
  <div class="notification-message" :class="type">
    <icon :name="type === 'success' ? 'complete' : type"  class="type-icon"/>
    <p><slot></slot></p>
    <div @click="$emit('closed')" class="notification-close-part">
      <icon name="close" class="notification-close-icon" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.notification-message {
  position: fixed;
  height: fit-content;
  max-height: 100px;
  display: flex;
  align-items: center;
  z-index: 105;
  padding: 0 16px;
  border-radius: 8px;
  width: 300px;
  transition: .6s ease;
}
.notification-message p {
  margin: 6px 12px;
  font-size: 12px;
  font-weight: 400;
}
.notification-message.success {
  border: 2px solid #76e150!important;
  background-color: white!important;
}
.notification-message.info {
  border: 2px solid #4289da!important;
  background-color: white!important;
}
.notification-message.warning {
  border: 2px solid #ffb95a!important;
  background-color: white!important;
}
.notification-message.error {
  border: 2px solid #f61c0d!important;
  background-color: white!important;
}
.type-icon {
  width: 28px;
  height: 28px;
}
.notification-close-icon {
  width: 10px;
  height: 10px;
}
.notification-close-part {
  margin-bottom: 5px;
}
@media only screen and (min-width:750px){
  .notification-message {
  top: 64px;
  right: 40px;
  min-width: 206px;
  }
}
@media only screen and (max-width:750px){
  .notification-message {
  top: 74px;
  right: 20px;
  min-width: 206px;
  }
}
</style>
