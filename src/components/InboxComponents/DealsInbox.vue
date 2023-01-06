<template>
    <div class="deal-inbox-card-list">
      <div
          v-for="(conv, index) in conversations"
          :key="index"
          class="deal-inbox-card inline"
          :class="[conv.deal.status, { selected: index == selected }]"
          @click="selectConverstion(index)"
      >
        <div
            v-for="(participant, index) in conv.participants"
            :key="index"
            class="image">
          <img v-if="participant.avatar" :src="'data:image/png;base64,' + participant.avatar.original" alt="" />
          <img v-else src="@/assets/img/person-default.png" />
        </div>
        <div>
          <h5>{{ conv.deal.type_label }}</h5>
          <p>
            {{ conv.deal.start_year }} - {{ conv.deal.end_year }}
            <span v-if="conv.deal.lender && conv.deal.lender.name != ''">by {{ conv.deal.lender.name }}</span>
          </p>
        </div>
        <Icon :name="conv.deal.status" class="status-icon" />
      </div>
      <div v-if="conversations.length <= 0" class="no-deals">
        <div class="no-messages">
          <p>There are no conversations.</p>
        </div>
      </div>
    </div>
</template>

<script>
import DealMixin from '@/mixins/Deal/Deal.mixin';
import Icon from '@/components/Icon';

export default {
  name: "DealsInbox",
  components: {
    Icon
  },
  mixins: [DealMixin],
  data: function () {
    return {
      selected: 0,
    };
  },
  props: {
    conversations: {
      type: Array,
      default: new Array(),
    },
    selectedIndex: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    conversations() {
      this.selectConverstion(this.selected);
    },
    selectedIndex() {
        this.selected = 0
        this.$emit("selectedIndex")
    }
  },
  methods: {
    selectConverstion(index) {
      this.selected = index;
      this.$emit('showMessages', this.conversations[index])
    },
  },
}
</script>
<style lang="scss" src="@/assets/styles/Inbox/inbox.scss" scoped></style>