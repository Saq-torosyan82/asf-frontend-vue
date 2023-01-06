<template>
  <div>
    <textarea
        name="message"
        id="message-text"
        placeholder="Message text"
        v-model="text"
    ></textarea>
    <UploadButton @set_files_ids="set_files_ids" :emptyAttachments="emptyAttachments"/>
    <div>
      <a
          href="#"
          class="button"
          @click="startANewConversation()"
      >Submit</a>
    </div>
  </div>
</template>

<script>
import UploadButton from '@/components/UploadButton.vue';
export default {
  name: "AddMessage",
  components: {
    UploadButton
  },
  data(){
    return{
      file_ids:[],
      text:"",
      currentActivityId: null,
      emptyAttachments: false
    }
  },
  methods: {
    set_files_ids (ids) {
      this.file_ids = ids
    },
    startANewConversation(){
      this.$emit("submit", {
        id: this.file_ids,
        message: this.text,
        currentActivityId: this.currentActivityId
      })
      this.text = "";
      this.emptyAttachments = !this.emptyAttachments
    },
  },
  mounted() {
    this.$root.$on('setActivityId', id => {
      this.currentActivityId = id
    })
  }
}
</script>

<style lang="scss" src="@/assets/styles/Inbox/addMessage.scss" scoped></style>