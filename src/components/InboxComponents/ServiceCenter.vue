<template>
    <div class="deal-inbox-card-list ">
      <div
          v-for="(conv, index) in conversationsService"
          :key="index"
          class="deal-inbox-card inline service-center-card"
          :class="[conv.deal.status, { selected: index == selected }]"
          @click="selectConverstion(index, conv.id )"
      >

        <div>
          <h5>{{ conv.question_type }}</h5>
          <p class='service-message-title'>
            {{conv.title}}
          </p>
          <p>
            Created: {{ conv.created_at }}
          </p>
          <p>
            Last activity:
            <span class="last-activity">{{conv.last_activity}}</span>
          </p>
        </div>
        <Icon :name="conv.deal.status" class="status-icon" />
      </div>

      <div v-if="conversationsService.length <= 0" class="no-deals">
        <div class="no-messages">
          <p>There are no conversations.</p>
        </div>
      </div>

  </div>
</template>

<script>
  import Icon from "@/components/Icon";
  import DealMixin from "@/mixins/Deal/Deal.mixin";

  export default {
  name: "ServicCenter",
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
      conversationsService: {
        type: Array,
        default: new Array(),
      },
      lastActivity: {
        type: Object
      },
      selectedIndex: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      selectConverstion(index, activityId ) {
        this.selected = index;
        this.$emit('showMessages', this.conversationsService[index])
        this.$root.$emit('setActivityId', activityId)
      },
    },
    watch: {
      lastActivity: {
        deep: true,
        handler() {
          this.conversationsService.forEach(item => {
            if (item.id === this.lastActivity.id) {
              item.last_activity = this.lastActivity.currentTime
            }
          })
        }
      },
      selectedIndex() {
        this.selected = 0
        if(this.conversationsService.length > 0) {
          this.$emit("selectedIndex", this.conversationsService[0].id)
        }

      },
    }

  }

</script>

<style lang="scss" src="@/assets/styles/Inbox/inbox.scss" scoped>

</style>