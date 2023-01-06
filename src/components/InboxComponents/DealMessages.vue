<template>
  <div class="messages-container">
    <div class="head_container">
      <div class="messages-title">
        <h5>{{ conversation.title }}</h5>
        <p>{{ conversation.created_at }}</p>
      </div>
      <div class="right-side">
          <div class="assigned-to deal-attributes text-with-label">
            <label>Assigned to:</label>
            <p class="" v-for="(participant, index) in conversation.participants"
               :key="index">
              <img v-if="participant.avatar" :src="'data:image/png;base64,' + participant.avatar.original" alt="" width="30"/>
              <img  v-else src="@/assets/img/person-default.png" />
              {{participant.full_name}}
            </p>
          </div>

          <div class="status deal-attributes text-with-label">
            <label>Status:</label>
            <p>
              <Icon :name="conversation.deal.status" />
              {{ conversation.deal.status_label }}
            </p>
          </div>
      </div>
    </div>

    <div v-if="newProps.length > 0" class="messages-content" ref="messages-content">
      <div
        v-for="(message) in newProps"
        :key="message.id"
        :id ="message.id"
        class="message-wrap inline"
      >
        <div class="logo">
          <div class="sender-logo">
            <img v-if="message.sender.avatar" :src="'data:image/png;base64,' + message.sender.avatar.original" alt="" />
            <img  v-else src="@/assets/img/person-default.png" />

          </div>
          <div class="sender-logo reciever" v-for="(reciever,index) in message.recievers" :key="index">
              <img v-if="reciever.avatar" :src="'data:image/png;base64,' + reciever.avatar.original">
              <img  v-else src="@/assets/img/person-default.png" />
          </div>
        </div>
        <div class="message">
          <div class="polygon"></div>
          <div class="messages-header inline">
            <div>
              <h5>{{ message.sender.full_name }}</h5>
              <p>to {{message.recievers[0].full_name}} <span v-if="message.recievers.length>1">and {{ message.recievers[1].full_name }}</span></p>
            </div>

            <p>{{ message.sent_date }}</p>
          </div>

          <p class="message-text">{{ message.message_body }}</p>

          <div class="attachments" v-if="message.attachements.length > 0">
            <div v-for="(attachment,index) in message.attachements" :key="index" class="attachment-item">
              <div> <IconAttachment /> {{ attachment.init_file_name}} </div>
              <div>
                <a href="" class="view-file" @click.prevent="viewFile(attachment.download_url)">View</a>
                <a href="#" @click.prevent="downloadFile(attachment.download_url)">Download</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="new-message-block">
      <AddMessage @submit="submit"></AddMessage>
    </div>
    <BaseModal
        :modalType="'view-file'"
        v-show="previewFile"
        @closed="closePreview"
    >
      <embed :type="fileMime" :src="previewFile" width="100%" height="600" />
    </BaseModal>
  </div>
</template>

<script>
import Icon from '@/components/Icon';
import CommunicationsRepository from "@/repositories/Inbox/CommunicationsRepository";
import AddMessage from "@/components/InboxComponents/AddMessage";
import IconAttachment from '@/assets/icons/attachment.svg';
import DownloadMixin from '@/mixins/User/download.mixin';
import BaseModal from '@/components/BaseModal';

export default {
  name: "NewDealConversation",
  components: {
    Icon,
    IconAttachment,
    AddMessage,
    BaseModal
  },
  computed: {
    newProps(){
      return this.messages
    }
  },
  mixins: [DownloadMixin],
  methods: {
    submit(e){
      this.$loading(true)
      CommunicationsRepository.addNewMessage(this.conversation.id,{
      message_body: e.message,
      attachements: e.id
      }).then((res) => {
        this.$emit("newMessages", res.data)
        this.$loading(false)
      }).then(() => {
        this.$refs["messages-content"].scrollTop = this.$refs["messages-content"].scrollHeight
      })
    }

  },
  watch:{
    messages:{
      deep:true,
      handler(){
        this.$refs["messages-content"].scrollTop = this.$refs["messages-content"].scrollHeight
      }
    }
  },
  mounted() {
    this.$refs["messages-content"].scrollTop = this.$refs["messages-content"].scrollHeight
  },
  props: {
    messages: {
      type: Array,
      default: new Array(),
    },
    conversation: {
      type: Object
    },
  },
}
</script>

<style lang="scss" src="@/assets/styles/Inbox/messagesBlock.scss" scoped></style>
<style lang="scss" src="@/assets/styles/Inbox/addMessage.scss" scoped></style>