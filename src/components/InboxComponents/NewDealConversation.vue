<template>
  <div class="new-conversation">
    <h3 class="component-header">Start a new conversation</h3>
    <h3 class="new-message-header"><span>1.</span> Choose the deal</h3>
    <div class="new-message-deals inline">
      <div
        v-for="(deal, index) in deals"
        :key="index"
        class="deal-inbox-card inline"
        :class="[deal.status, { selected: deal.id == data.selectedDealId }]"
        @click="selectADeal(deal.id)"
      >
        <div class="image">
          <img
            v-if="deal.counterparty.avatar"
            :src="deal.counterparty.avatar"
          />
          <img v-else src="@/assets/img/Deal/default-deal.png" />
        </div>
        <div>
          <h5>{{ deal.type_label }}</h5>
          <p>
            {{ deal.start_date | moment('YYYY') }} -
            {{ deal.finish_date | moment('YYYY') }}

            <span>by {{ deal.lender.name }}</span>
          </p>
        </div>
        <Icon :name="deal.status" class="status-icon" />
      </div>
    </div>
    <div class="step2" v-if="data.selectedDealId != -1">
      <h3 class="new-message-header">2. Choose participants</h3>

      <multiselect
        class="selector"
        v-if="data.selectedDealId != -1"
        v-model="data.participants_id"
        placeholder="Assign to"
        label="name"
        :show-labels="false"
        :options="participants"
      >
      </multiselect>
    </div>

    <div class="message" v-if="data.selectedDealId != -1">
      <h3 class="new-message-header" v-if="data.selectedDealId != -1">
        3. Messages
      </h3>
      <input type="text" placeholder="Title" v-model="data.title" />

      <AddMessage @submit="submit"></AddMessage>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon';
import CommunicationsRepository from '@/repositories/Inbox/CommunicationsRepository';
import AddMessage from '@/components/InboxComponents/AddMessage';
import Multiselect from 'vue-multiselect';

export default {
  name: 'NewDealConversation',
  components: {
    Icon,
    AddMessage,
    Multiselect,
  },
  props: {
    deals: {
      type: Array,
      default: new Array(),
    },
  },

  data() {
    return {
      attachements: [],
      data: {
        selectedDealId: -1,
        title: '',
        messageText: '',
        participants_id: [],
        attachements: [],
        attachements_id: [],
      },
      dealParticipants: [],
      participants: [],
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    submit(e) {
      this.attachements = e.id;
      this.data.messageText = e.message;
      this.startANewConversation();
    },
    selectADeal(dealId) {
      this.participants = [];
      if (dealId !== -1) {
        this.data.selectedDealId = dealId;
        let $this = this;
        $this.$loading(true);
        CommunicationsRepository.getParticipants(dealId)
          .then((response) => {
            $this.$loading(false);
            response.data.map((deal, index) => {
              this.participants.push({
                id: deal.id,
                name: deal.is_admin
                  ? 'Sportsfi'
                  : `${deal.first_name} ${deal.last_name}`,
              });
            });
            this.dealParticipants = response.data;
          })
          .catch((error) => {
            console.error('Error: ' + error);
            $this.$loading(false);
          });
      }
    },
    getData() {
      let $this = this;
      $this.$loading(true);
      CommunicationsRepository.getUserDeals()
        .then((response) => {
          $this.$loading(false);
          this.deals = response.data.data;
        })
        .catch((error) => {
          console.error('Error: ' + error);
          $this.$loading(false);
        });
    },
    startANewConversation() {
      let $this = this;
      let participants = CommunicationsRepository.startANewConversation({
        deal_id: this.data.selectedDealId,
        title: this.data.title,
        message_body: this.data.messageText,
        participant_id: this.data.participants_id.id,
        attachements: this.attachements,
      })
        .then((res) => {
          this.$emit('newConv', res.data.data);
          this.$emit('message-sent');
        })
        .catch((error) => {
          console.error('Error: ' + error);
          $this.$loading(false);
        });
    },
  },
};
</script>

<style
  lang="scss"
  src="@/assets/styles/Inbox/newDealConversation.scss"
  scoped
></style>
<style lang="scss" src="@/assets/styles/Inbox/addMessage.scss" scoped></style>
