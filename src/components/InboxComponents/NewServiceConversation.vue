<template>
  <div class="component new-conversation">
    <h3 class="component-header">Start a new conversation</h3>
    <div class="step2" >
      <h3 class="new-message-header">
        1.  Question type
      </h3>

      <multiselect
          class="selector"
          v-model="data.participants_id"
          placeholder="Choose from the list"
          label="name"
          :show-labels="false"
          :options="questions"
      >
      </multiselect>
    </div>

    <div class="message" >
      <h3 class="new-message-header" >
        2.  Messages
      </h3>
      <input type="text" placeholder="Title" v-model="data.title" />

      <AddMessage @submit="submit"></AddMessage>

    </div>
  </div>

</template>

<script>
import Icon from '@/components/Icon';

import CommunicationsRepository from '@/repositories/Inbox/CommunicationsRepository';
import AddMessage from "@/components/InboxComponents/AddMessage";
import Multiselect from 'vue-multiselect';
export default {
  name: "NewDealConversation",
  components: {
    AddMessage,
    Multiselect
  },


  data() {
    return {
      attachements:[],

      data: {
        title: '',
        messageText: '',
        participants_id: [],
        attachements: [],
        attachements_id: []
      },
      dealParticipants: [],
      questions: [],
    };
  },

  methods: {
    getQuestions() {
      CommunicationsRepository.getQuestions()
          .then((res) => {
            this.questions = res.data;
          })
          .catch((error) => {
            console.error("Error: " + error)
            this.$loading(false);
          });
    },
    submit(e){
      this.attachements = e.id;
      this.data.messageText = e.message
      this.startANewConversation()
    },
    startANewConversation() {
      let $this = this;
      let participants = CommunicationsRepository.startNewServiceConversation({
        title: this.data.title,
        question_type: this.data.participants_id.id,
        message_body: this.data.messageText,
        attachements:this.attachements
      })
          .then((res) => {
            this.$emit("newConv",res.data.data)
            this.$emit('message-sent');
            this.data.participants_id=[]
            this.data.title = ''
          })
          .catch((error) => {
            console.error("Error: " + error)
            $this.$loading(false);
          });
    },
  },
  mounted() {
    this.getQuestions();
  },

}
</script>

<style lang="scss" src="@/assets/styles/Inbox/newDealConversation.scss" scoped></style>
<style lang="scss" src="@/assets/styles/Inbox/addMessage.scss" scoped></style>