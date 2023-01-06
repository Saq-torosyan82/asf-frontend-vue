import Client from '../Clients/AxiosClient';

const dealcalculatorSaveResource = '/save';
const dealcalculatorFinishResource = '/submit';
const dealcalculatorUpdateResource = '/update';
const dealsResource = '/deals';
const exportDealsResource = '/export-deals';
const quotesResource = '/quotes';
const missedDealsResource = '/deals-missed';
const currentDealsResource = '/deals-current';
const acceptDealResource = '/accept';
const rejectDealResource = '/reject';
const contractResource = '/contract';
const cancelResource = '/cancel';
const acceptDocumentsResource = '/accept-documents';
const uploadResource = '/upload';
const underReviewResource = '/under-review';
const rejectDocumentsResource = '/reject-documents';
const meResource = '/me';
const meDashboard = '/me/dashboard';
const liveDealsResource = '/deals-live';
const offersResource = '/offers';
const lenderTermsResource = '/lender-terms';
const signContractResource = '/sign-contract';
const adminBorrowers = '/admin/borrowers';
const adminLenders = '/admin/lenders';
const adminDealsByCountry = '/admin/deals-by-country';
const adminTotalDealPayment = '/admin/total-deal-payments';

export default {
  adminTotalDealPayment() {
    return Client.get(`${adminTotalDealPayment}`);
  },
  adminTotalDealPaymentWithCurrency(currency) {
    return Client.get(
      `${adminTotalDealPayment}?selected_currency=${currency}`
    );
  },
  meDashboard() {
    return Client.get(`${meDashboard}`);
  },
  adminDealsByCountry() {
    return Client.get(`${adminDealsByCountry}`);
  },
  adminDealBorrowers() {
    return Client.get(`${adminBorrowers}`);
  },
  adminDealBorrowersWithCurrency(currency) {
    return Client.get(`${adminBorrowers}?selected_currency=${currency}`);
  },
  adminDealLenders() {
    return Client.get(`${adminLenders}`);
  },
  adminDealLendersWithCurrency(currency) {
    return Client.get(`${adminLenders}?selected_currency=${currency}`);
  },
  dealcalculatorSave(data) {
    return Client.post(`${dealsResource}${dealcalculatorSaveResource}`, data);
  },
  acceptLenderTerms(data) {
    return Client.post(`${lenderTermsResource}`, data);
  },
  dealcalculatorUpdate(data) {
    return Client.post(`${dealsResource}${dealcalculatorUpdateResource}`, data);
  },
  dealcalculatorFinish(data) {
    return Client.post(`${dealsResource}${dealcalculatorFinishResource}`, data);
  },
  getDeals(type, limit, page) {
    return Client.get(
      `${dealsResource}?search=deal_type:${type}&limit=${limit}&page=${page}`
    );
  },
  exportDeals(parameters) {
    return Client.get(
        `${exportDealsResource}${parameters}`,
        {
          responseType: 'blob'
        }
    );
  },
  exportDealDetails(id) {
    return Client.get(
        `${exportDealsResource}/${id}`,
        {
          responseType: 'blob'
        }
    );
  },
  getLenderMissedDeals(limit, page) {
    return Client.get(`${missedDealsResource}?limit=${limit}&page=${page}`);
  },
  getQuotes(limit, page) {
    return Client.get(`${quotesResource}?limit=${limit}&page=${page}`);
  },
  getCurrentDeals(limit, page) {
    return Client.get(`${currentDealsResource}?limit=${limit}&page=${page}`);
  },
  getDealDetail(id) {
    return Client.get(`${dealsResource}/${id}`);
  },
  cancelDeal(id) {
    return Client.get(`${dealsResource}/${id}${cancelResource}`);
  },
  acceptDocuments(id) {
    return Client.get(`${dealsResource}/${id}${acceptDocumentsResource}`);
  },
  underReviewDocuments(id) {
    return Client.get(`${dealsResource}/${id}${underReviewResource}`);
  },
  updateDealStatus(id, status, data) {
    data['status'] = status;
    // data['_method'] = 'PATCH';
    return Client.patch(`${dealsResource}/${id}/status`, data);
  },
  signContract(id, data) {
    return Client.post(`${dealsResource}/${id}${signContractResource}`, data);
  },
  rejectDocuments(id, data) {
    return Client.post(
      `${dealsResource}/${id}${rejectDocumentsResource}`,
      data
    );
  },
  uploadContract(id, payload) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = parseInt(
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        );
        if (config.onProgress) config.onProgress(progress);
      },
    };
    return Client.post(
      `${dealsResource}/${id}${contractResource}`,
      payload,
      config
    );
  },
  upload(id, payload) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return Client.post(
      `${dealsResource}/${id}${uploadResource}`,
      payload,
      config
    );
  },
  deleteContract(id) {
    return Client.delete(`${dealsResource}/${id}${contractResource}`);
  },
  deleteTermSheet(id) {
    // SEEMEk: change here
    return Client.delete(`${dealsResource}/${id}${uploadResource}`);
  },
  getLiveDeals(request) {
    return Client.get(`${liveDealsResource}${request}`);
  },
  getLiveDealsWithCurrency(request, currency) {
    return Client.get(
      `${liveDealsResource}${request}?selected_currency=${currency}`
    );
  },
  acceptDeal(id, payload) {
    return Client.post(`${dealsResource}/${id}${acceptDealResource}`, payload);
  },
  rejectDeal(id, payload) {
    return Client.post(`${dealsResource}/${id}${rejectDealResource}`, payload);
  },
  rejectOffer(dealId, offerId, payload) {
    return Client.patch(
      `${dealsResource}/${dealId}${offersResource}/${offerId}`,
      payload
    );
  },
  acceptOffer(dealId, offerId, payload) {
    return Client.patch(
      `${dealsResource}/${dealId}${offersResource}/${offerId}`,
      payload
    );
  },
};
