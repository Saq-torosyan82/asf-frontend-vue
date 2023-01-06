<template>
  <div class="content">
    <HeaderNavigation> Inbox </HeaderNavigation>
    <div class="inbox-content">
      <b-tabs class="messages-list">
        <b-tab title="Deals Inbox" @click="changeTab('deal')" active>
          <div class="component-no-padding deals-inbox scroll">
            <div class="deals-inbox-header inline">
              <a href="#" class="link-text" @click="startNewConversation()"
                >+ Start new communication</a
              >
              <Icon name="filter" class="deals-inbox-header-filter dark" />
            </div>

            <DealsInbox
              :conversations="deal_conversations"
              :selectedIndex="selectedIndex"
              @showMessages="showMessages"
              @selectedIndex="indexStatus"
            >
            </DealsInbox>
          </div>
        </b-tab>
        <b-tab title="Service Center" @click="changeTab('service')">
          <div class="component-no-padding deals-inbox scroll">
            <div class="deals-inbox-header inline">
              <a href="#" class="link-text" @click="startNewConversation()"
                >+ Start new communication</a
              >
              <Icon name="filter" class="deals-inbox-header-filter dark" />
            </div>

            <ServicCenter
              :conversationsService="service_conversations"
              :selectedIndex="selectedIndex"
              :lastActivity="last_activity"
              @showMessages="showMessages"
              @selectedIndex="indexStatus"
            ></ServicCenter>
          </div>
        </b-tab>
      </b-tabs>

      <b-tabs
        class="messages"
        v-if="newDealConversation || newServiceConversation"
      >
        <b-tab title="New conversation">
          <div class="component" v-if="newDealConversation">
            <NewDealConversation
              :deals="userDeals"
              @newConv="addConversationsList"
            >
            </NewDealConversation>
          </div>
          <div
            class="component"
            title="New conversation"
            v-else-if="newServiceConversation"
          >
            <NewServiceConversation @newConv="addConversationsList">
            </NewServiceConversation>
          </div>
        </b-tab>
      </b-tabs>
      <b-tabs class="messages" v-else-if="messages.length > 0">
        <b-tab
          title="Messages"
          active
          v-if="
            selectedConversationTab == 'deal' && deal_conversations.length > 0
          "
        >
          <div class="component">
            <DealMessages
              @newMessages="newMessages"
              :messages="messages"
              :conversation="selectedConversation"
            >
            </DealMessages>
          </div>
        </b-tab>
        <b-tab
          title="Messages"
          active
          v-else-if="
            selectedConversationTab == 'service' &&
            service_conversations.length > 0
          "
        >
          <div class="component">
            <ServiceMessages
              @newMessages="newMessages"
              :messages="messages"
              :conversation="selectedConversation"
              :firstItemId="firtsItemId"
            ></ServiceMessages>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import store from '@/store';
import Icon from '@/components/Icon';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import CommunicationsRepository from '@/repositories/Inbox/CommunicationsRepository';
import DealsInbox from '@/components/InboxComponents/DealsInbox';
import ServicCenter from '@/components/InboxComponents/ServiceCenter';
import NewDealConversation from '@/components/InboxComponents/NewDealConversation';
import NewServiceConversation from '@/components/InboxComponents/NewServiceConversation';
import DealMessages from '@/components/InboxComponents/DealMessages';
import ServiceMessages from '@/components/InboxComponents/ServiceMessages';
import DealRepository from '@/repositories/DealCalculator/DealRepository';
import { horizontalScroll } from '../../main';
export default {
  components: {
    DealMessages,
    ServiceMessages,
    DealsInbox,
    Icon,
    HeaderNavigation,
    ServicCenter,
    NewDealConversation,
    NewServiceConversation,
  },
  computed: {},
  data() {
    return {
      selectedConversationTab: 'deal',
      selectedConversation: {},
      messages: [],
      deal_conversations: [],
      service_conversations: [],
      newDealConversation: false,
      newServiceConversation: false,
      userDeals: [],
      last_activity: {},
      selectedIndex: false,
      firtsItemId: null,
    };
  },
  watch: {},
  mounted() {
    this.getCommunications();
    horizontalScroll();
  },
  methods: {
    indexStatus(id = null) {
      setTimeout(() => {
        this.selectedIndex = false;
      }, 0);
      this.firtsItemId = id;
    },
    addConversationsList(e) {
      let $this = this;
      switch (e.type) {
        case 1:
          $this.deal_conversations.unshift(e);
          break;
        case 2:
          $this.service_conversations.unshift(e);
          break;
      }
      this.showMessages(e);
    },
    newMessages(e, id = null) {
      this.last_activity = {
        id: id,
        currentTime: e.data.last_activity,
      };
      this.messages.push(e.data);
    },
    changeTab(tab) {
      this.selectedConversationTab = tab;
      this.newDealConversation = false;
      this.newServiceConversation = false;
      this.selectedIndex = true;
      switch (tab) {
        case 'deal':
          if (this.deal_conversations.length > 0) {
            this.showMessages(this.deal_conversations[0]);
          }
          break;
        case 'service':
          if (this.service_conversations.length > 0) {
            this.showMessages(this.service_conversations[0]);
          }
          break;
        default:
          break;
      }
    },
    addMessage(value) {
      value.id = this.conversationZ.length;
      this.conversationZ.push(value);
      this.newConversation = false;
    },
    startNewConversation() {
      const $this = this;
      switch ($this.selectedConversationTab) {
        case 'deal':
          $this.$loading(true);
          CommunicationsRepository.getUserDeals()
            .then((response) => {
              $this.$loading(false);
              $this.deals = response.data.data;
              $this.newDealConversation = true;
              $this.newServiceConversation = false;
            })
            .catch((error) => {
              console.error('Error: ' + error);
              $this.$loading(false);
            });
          break;
        case 'service':
          this.newDealConversation = false;
          this.newServiceConversation = true;
          break;
        default:
          this.newDealConversation = false;
          this.newServiceConversation = false;
          break;
      }
    },
    getCommunications() {
      let $this = this;
      $this.$loading(true);
      CommunicationsRepository.getCommunications()
        .then((response) => {
          $this.$loading(false);
          response.data.data.forEach((conv) => {
            switch (conv.type) {
              case 1:
                $this.deal_conversations.push(conv);
                break;
              case 2:
                $this.service_conversations.push(conv);
                break;
            }
          });
        })
        .catch((error) => {
          console.error('Error: ' + error);
          $this.$loading(false);
        });
    },
    showMessages(conv) {
      this.newDealConversation = false;
      this.newServiceConversation = false;

      let $this = this;
      $this.$loading(true);
      CommunicationsRepository.getMessages(conv.id)
        .then((response) => {
          $this.$loading(false);
          $this.messages = response.data.data;
          $this.selectedConversation = conv;
        })
        .catch((error) => {
          console.error('Error: ' + error);
          $this.$loading(false);
        });
    },

    selectDeal(dealId) {
      this.selectedDeal = dealId;
    },
  },
};
</script>
<style lang="scss" src="@/assets/styles/Inbox/inbox.scss" scoped></style>
