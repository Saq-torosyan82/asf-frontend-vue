<template>
  <div class="itemWrap">
    <div class="item">
      <img v-if="avatar && avatar != ''" v-auth-image="avatar" alt="" />
      <img v-else src="@/assets/img/person-default.png" alt="" />
      <div class="content-info">
        <a v-if="linkTo" class="text" :href="linkTo">
          <p>
            {{ text }}
          </p>
        </a>

        <a v-else class="text" @click.prevent="edit">
          <p>
            {{ text }}
          </p>
        </a>

        <a
          v-if="items && items.length > 0"
          class="label"
          @click="openDropdown()"
        >
          {{ label }}
          <icon
            name="back-arrow"
            class="arrow"
            :class="dropdownOpen ? 'open' : ''"
          />
        </a>
      </div>
      <div class="actions inline">
        <a href="#" @click.prevent="edit">
          <icon name="edit" />
        </a>
        <a href="#" @click.prevent="$emit('delete')" v-show="this.delete">
          <icon name="delete" />
        </a>
      </div>
    </div>
    <div v-if="items && items.length > 0" class="below" v-show="dropdownOpen">
      <ListItemWithImage
        v-for="(item, index) in items"
        :key="index"
        :text="item.name"
        :label="item.email"
        :delete="false"
        :hasImage="false"
      />
    </div>
  </div>
</template>
<script>
import Gestifute from '@/assets/img/editProfile/gestifute.png';
import ListItemWithImage from '@/components/ListItemWithImage.vue';
export default {
  components: {
    ListItemWithImage,
  },
  props: {
    text: {
      type: String,
      require: true,
    },
    linkTo: {
      type: String,
    },
    label: {
      type: String,
      require: true,
    },
    delete: {
      type: Boolean,
      require: true,
    },
    items: {
      type: Array,
    },
    avatar: {
      type: String,
      require: false,
    },
  },
  data() {
    return {
      gestifute: Gestifute,
      dropdownOpen: false,
    };
  },
  methods: {
    openDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    edit() {
      this.$emit('edit', true);
    },
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
    justify-content: flex-end;
  }
}
.item img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid #dbe7f4;
}

.item a.text,
.item a.label,
.item a p {
  margin-bottom: 0;
  display: block;
}
.item a.text {
  text-decoration: none;
  color: #253242;
}
.item a.text p {
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
}
.item a.text:hover {
  font-weight: 600;
}
.item a {
  font-size: 12px;
  color: #3a9eba;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.arrow {
  fill: #3a9eba;
  stroke: #3a9eba;
  stroke-width: 0.5px;
  margin: 0 0 1.5px 0;
  transform: rotate(-90deg);
}
.arrow.open {
  transform: rotate(90deg);
}

/* .item .actions a {
  margin-left: 15px;
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
.below::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 30%;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid #f3f7fc;
}
.below {
  position: relative;
  margin-top: 5px;
  padding: 10px;
  width: calc(100% + 20px);
  margin-left: -10px;
  border-radius: 10px;
  background-color: #f3f7fc;
}
.below .item:not(:first-of-type) {
  margin-top: 15px;
}
</style>
