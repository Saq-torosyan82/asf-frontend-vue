import Client from '../Clients/AxiosClient';

const communications = '/communications';
const getUserDeals = '/deals?search=deal_type:live';
const download = '/download'

export default {
  addNewMessage(comID,payload){
    return Client.post(`${communications}/message/${comID}`, payload)
  },
  getUserDeals() {
    return Client.get(`${getUserDeals}`);
  },
  getMessages(dealId) {
    return Client.get(`${communications}/messages/${dealId}`);
  },
  getCommunications() {
    return Client.get(`${communications}`);
  },
  startANewConversation(payload) {
    return Client.post(`${communications}/deal`, payload);
  },
  startNewServiceConversation(payload){
    return Client.post(`${communications}/service`, payload);
  },
  attachmentsUpload(payload) {
    return Client.post(`${communications}/attachements`, payload);
  },
  getParticipants(dealId) {
    return Client.get(`${communications}/participants/${dealId}`);
  },
  downloadAttachment(uuid) {
    return Client.get(`${download}/${uuid}`);
  },
  getQuestions() {
    return Client.get(`${communications}/service/questions`);
  },
  deleteAttachement(upload_id) {
    return Client.delete(`${communications}/attachements/${upload_id}`);
  },
};
