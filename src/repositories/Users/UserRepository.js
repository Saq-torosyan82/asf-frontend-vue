import store from '@/store';
import Client from '../Clients/AxiosClient';
import UserService from '@/services/user.service.js';
import BorrowerTypes from '@/enums/modules/BorrowerType';
import User from '../../modules/User/User';

const resource = '/users';
const meResource = '/me';

const checkEmailAvailabilityResource = 'check-email-availability';
const checkAthleteAvailabilityResource = 'check-athlete';
const profileResource = '/profile';
const agentsResource = '/agents';
const avatarResource = '/avatar';
const userProfileResource = meResource + profileResource;

const userDocumentsResource = '/documents';
const personalResource = '/personal';

const uploadAvatarResource = '/upload/avatar';

const userDashboardResource = meResource + '/dashboard';
const userAthletes = '/athletes';
const disableUserResource = '/disable';

const userSponsorships = '/sponsorships';
const clubSponsorsResource = '/club-sponsors';

const removeDocResource = '/files';
const uploadDocResource = meResource + '/documents';
const previousTeamsResource = '/previous-teams';
const changePasswordResource = '/password/change';

const havePasswordSetResource = '/have-password-set';
const confirmPaymentResource = '/confirm-payment';

const lenderCriteriaResource =  "/lender-criteria";
const successRateResource =  "/success-rate";

const companyUsersResource = "/company-users"
const companyUserResource = "/company-user"
const rejectUserResource = "/user/reject"
const approveUserResource = "user/approve"

export default {
  approveUser(payload) {
    return Client.post(`${approveUserResource}`, payload);
  },
  rejectUser(payload) {
    return Client.post(`${rejectUserResource}`, payload);
  },
  get() {
    return Client.get(`${resource}`);
  },
  confirmPayment(hash, confirmed) {
    return Client.get(`${confirmPaymentResource}?payment=${hash}&confirm=${confirmed}`);
  },
  getProfileInfo(hash) {
    return Client.get(`${resource}/${hash}${profileResource}`);
  },
  getClubSponsors() {
    return Client.get(`${clubSponsorsResource}`);
  },
  getUser(id) {
    return Client.get(`${resource}/${id}`);
  },
  getAgents() {
    return Client.get(`${meResource}${agentsResource}`);
  },
  create(payload) {
    return Client.put(`${resource}`, payload);
  },
  update(payload, id) {
    return Client.put(`${resource}/${id}`, payload);
  },
  deleteAgent(id) {
    return Client.delete(`${meResource}${agentsResource}/${id}`);
  },
  delete(id) {
    return Client.delete(`${resource}/${id}`);
  },
  getMyBasicInfo() {
    return Client.get(`${meResource}`);
  },
  getSuccessRate() {
    return Client.get(`${meResource}${successRateResource}`);
  },
  checkEmailAvailability(payload) {
    return Client.post(
      `${resource}/${checkEmailAvailabilityResource}`,
      payload
    );
  },
  checkAthleteAvailability(payload) {
    return Client.post(
      `${resource}/${checkAthleteAvailabilityResource}`,
      payload
    );
  },
  getUserProfileById(id) {
    return Client.get(`${resource}/${id}${profileResource}`);
  },
  getUserProfile() {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.get(
        `${resource}/${store.getters['editUser/getHash']}${profileResource}`
      );
    } else {
      return Client.get(`${userProfileResource}`);
    }
  },
  getUserDocuments(paylaod) {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.get(
        `${resource}/${store.getters['editUser/getHash']}${userDocumentsResource}`,
        paylaod
      );
    } else {
      return Client.get(`${meResource}${userDocumentsResource}`, paylaod);
    }
  },
  getPersonalDocuments(contractType) {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.get(
        `${resource}/${store.getters['editUser/getHash']}${userDocumentsResource}${personalResource}?contract_type=${contractType}`
      );
    } else {
      return Client.get(
        `${meResource}${userDocumentsResource}${personalResource}?contract_type=${contractType}`
      );
    }
  },
  removeDocument(fileId) {

    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.delete(
          `${resource}/${store.getters['editUser/getHash']}${userDocumentsResource}/${fileId}`
      );
    } else {
      return Client.delete(`${uploadDocResource}/${fileId}`);
    }
  },

  disableUserAccount(id){
    return Client.delete(`${resource}/${id}${disableUserResource}`);
  },
  uploadDocument(payload) {
    const headers = { 'Content-Type': 'multipart/form-data' };
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.post(`${resource}/${store.getters['editUser/getHash']}${userDocumentsResource}`, payload, { headers });
    } else {
      return Client.post(`${uploadDocResource}`, payload, { headers });
    }
  },
  uploadAvatar(payload) {
    const headers = { 'Content-Type': 'multipart/form-data' };
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.post(`${resource}/${store.getters['editUser/getHash']}${avatarResource}`, payload, { headers });
    } else {
      return Client.post(`${uploadAvatarResource}`, payload, { headers });
    }
  },
  updateUserProfile(payload) {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.post(
        `${resource}/${store.getters['editUser/getHash']}${profileResource}`,
        payload,
        config
      );
    } else {
      return Client.post(`${userProfileResource}`, payload, config);
    }
  },
  getUserDashboard() {
    return Client.get(`${userDashboardResource}`);
  },
  getUserAthletes() {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.get(
          `${resource}/${store.getters['editUser/getHash']}${userAthletes}`
      );
    } else {
      return Client.get(`${meResource}${userAthletes}`);
    }

  },
  createUserAthlete(payload) {
    let headers = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.post(
        `${resource}/${store.getters['editUser/getHash']}${userAthletes}`,
        payload,
        headers
      );
    } else {
      return Client.post(`${meResource}${userAthletes}`, payload, headers);
    }
  },
  deleteUserAthlete(id) {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.delete(
        `${resource}/${store.getters['editUser/getHash']}${userAthletes}/${id}`
      );
    } else {
      return Client.delete(`${meResource}${userAthletes}/${id}`);
    }
  },
  getSponsorships() {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.get(
        `${resource}/${store.getters['editUser/getHash']}${userSponsorships}`
      );
    } else {
      return Client.get(`${meResource}${userSponsorships}`);
    }
  },
  getAllSponsorships() {
    let type = store.getters['editUser/getType'];
    if (
      (User.isAvailableToEdit() &&
        store.getters['editUser/getHash'] !== '' &&
        type === BorrowerTypes.ATHLETE) ||
      type === BorrowerTypes.CORPORATE
    ) {
      return Client.get(`${userSponsorships}?borrower_type=${type}`);
    } else {
      return Client.get(`${userSponsorships}`);
    }
  },
  addSponsor(payload) {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.post(
        `${resource}/${store.getters['editUser/getHash']}${userSponsorships}`,
        payload
      );
    } else {
      return Client.post(`${meResource}${userSponsorships}`, payload);
    }
  },
  deleteSponsorships(id) {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.delete(
        `${resource}/${store.getters['editUser/getHash']}${userSponsorships}/${id}`
      );
    } else {
      return Client.delete(`${meResource}${userSponsorships}/${id}`);
    }
  },
  addPrevTeam(payload) {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.post(
        `${resource}/${store.getters['editUser/getHash']}${previousTeamsResource}`,
        payload
      );
    } else {
      return Client.post(`${previousTeamsResource}`, payload);
    }
  },
  checkHavePasswordSet() {
    return Client.get(`${meResource}${havePasswordSetResource}`);
  },
  changePassword(payload) {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.get(
        `${resource}/${store.getters['editUser/getHash']}${changePasswordResource}`,
        payload
      );
    } else {
      return Client.post(`${changePasswordResource}`, payload);
    }
  },
  deleteCriteria(id) {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.delete(
        `${resource}/${store.getters['editUser/getHash']}${lenderCriteriaResource}/${id}`
      );
    } else {
      return Client.delete(`${meResource}${lenderCriteriaResource}/${id}`);
    }
  },
  storeCriteria(payload) {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.post(
        `${resource}/${store.getters['editUser/getHash']}${lenderCriteriaResource}`,
        payload
      );
    } else {
      return Client.post(`${meResource}${lenderCriteriaResource}`, payload);
    }
  },
  deleteAccount() {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.delete(`${resource}/${store.getters['editUser/getHash']}`);
    } else {
      return Client.get(`${meResource}${disableUserResource}`);
    }
  },
  disableAccount(id) {
    return Client.post(`${resource}/${id}${disableUserResource}`);
  },
  updateCriteria(payload, id) {
    if (User.isAvailableToEdit() && store.getters['editUser/getHash'] !== '') {
      return Client.put(
        `${resource}/${store.getters['editUser/getHash']}${lenderCriteriaResource}/${id}`,
        payload
      );
    } else {
      return Client.put(`${meResource}${lenderCriteriaResource}/${id}`, payload);
    }
  },
  getCompanyUsers(){
    return Client.get(`${companyUsersResource}`);
  },
  deleteCompanyUsers(id){
    return Client.delete(`${companyUserResource}/${id}`);
  }
};
