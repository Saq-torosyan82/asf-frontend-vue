<template>
  <div class="component athletes-component" style="max-height: 270px">
    <div class="component-header">
      <h3 class="section-header">Athletes</h3>
      <a
        href="/add-athlete/"
        @click.prevent="addAthleteModal = true"
        class="link-text"
        >+Add athlete</a
      >
    </div>
    <div class="athletes" style="max-height: 190px">
      <AthleteWidget />
    </div>
    <BaseModal
      v-if="addAthleteModal"
      @closed="addAthleteModal = false"
      :modal-type="'add-athlete'"
    ></BaseModal>
  </div>
</template>

<script>
// import store from '@/store';
import AthleteWidget from '@/components/UserComponents/AthleteWidget';
import BaseModal from '../BaseModal';

export default {
  name: 'AthleteWidgetCard',
  components: {
    AthleteWidget,
    BaseModal,
  },
  data() {
    return {
      addAthleteModal: false,
    };
  },
  props: {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.component-header h3 {
  margin: 0;
}
.component-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  a.link-text {
    margin-right: 20px;
  }
}
.section-header {
  font-size: 14px;
  font-weight: 700;
}
a.link-text {
  color: var(--primary);
  font-size: 14px;
  font-weight: 700;
}
.athletes-component .athletes {
  height: 400px;
  overflow-y: auto;
  padding-right: 20px;
}
.athletes-component.component {
  padding-right: 0;
  height: auto;
}

::-webkit-scrollbar-track {
  background: white;
}
</style>
