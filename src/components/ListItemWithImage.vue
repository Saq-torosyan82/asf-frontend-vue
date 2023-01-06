<template>
  <div class="item">
    <span v-show="hasImage">
      <img v-if="avatar && avatar != ''" v-auth-image="avatar" alt="" />
      <img v-else src="@/assets/img/person-default.png" alt="" />
    </span>

    <div class="content-info">
      <a class="text">
        <p>{{ text }}</p>
      </a>
      <p class="label" :class="label == 'Bank' ? 'Bank' : ''">
        {{ label }}
      </p>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import Cristiano from '@/assets/img/editProfile/cristiano.png';
import Bank from '@/assets/img/bank.png';
export default {
  props: {
    text: {
      type: String,
      require: true,
    },
    label: {
      type: String,
      require: true,
    },
    delete: {
      type: Boolean,
      require: true,
    },
    avatar: {
      type: String,
      require: false,
    },
    hasImage: {
      type: Boolean,
      default: true,
      require: true,
    },
  },
  data() {
    return {
      cristiano: Cristiano,
      bank: Bank,
    };
  },
};
</script>
<style lang="scss" scoped>
.item {
  display: inline-flex;
  align-items: center;
  width: 100%;
  .content-info {
    flex-grow: 1;
  }
  .actions {
    margin-left: auto;
    gap: 10px;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
  }
}
.item img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid #dbe7f4;
}
.item a,
.item p {
  margin-bottom: 0;
}
.item a.text {
  text-decoration: none;
  cursor: pointer;
}
.item a.text p {
  font-size: 14px;
  font-weight: 500;
  color: #253242;
  line-height: 16px;
}
.item p {
  font-size: 12px;
  font-weight: 400;
  color: #93a0ae;
}
.item p.Bank {
  color: #3a9eba;
  font-weight: 700;
}

/* .item .actions a {
  margin-left: 10px;
}
.item .actions a:first-of-type {
  margin-left: 0px;
} */
.item .actions svg {
  margin: 0 0 3px 0;
}
.item .actions svg path {
  color: #3a9eba;
}
</style>
