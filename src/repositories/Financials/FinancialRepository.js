import Client from '../Clients/AxiosClient';

const financialsResource = '/financials';
const documentsResource = '/documents';
const filesResource = '/files';
const submitDocumentsResource = '/submit-documents';
const statusDocumentsResource = '/status';
const financialSnapshotReport = '/financial-snapshot-report';
const financialValues = '/financials/values';

export default {
  getFinancials() {
    return Client.get(`${financialsResource}`);
  },
  submitFinancialValues(values) {
    return Client.post(`${financialValues}`, values);
  },
  getFinancialSnapshotReport() {
    return Client.get(`${financialSnapshotReport}`);
  },
  getClubFinancials(clubId, currency = '') {
    return Client.get(`${financialsResource}/${clubId}` + (currency !== '' ? `?selected_currency=${currency}` : ''));
  },
  getClubFinancialsWithCurrency(currency) {
    return Client.get(`${financialsResource}?selected_currency=${currency}`);
  },
  updateActualFinancialValue(id, payload) {
    return Client.post(`${financialsResource}/value/${id}`, payload);
  },
  uploadDocuments(payload) {
    const headers = { 'Content-Type': 'multipart/form-data' };
    return Client.post(`${financialsResource}${documentsResource}`, payload, {
      headers,
    });
  },
  submitDocuments(payload) {
    // const headers = { 'Content-Type': 'multipart/form-data' };
    return Client.post(
      `${financialsResource}${submitDocumentsResource}`,
      payload,
    );
  },
  deleteDocument(id) {
    return Client.delete(`${financialsResource}${documentsResource}/${id}`);
  },
  getDocuments() {
    return Client.get(`${financialsResource}${documentsResource}${filesResource}`);
  },
  getClubDocuments(clubId) {
    return Client.get(`${financialsResource}${documentsResource}${filesResource}/${clubId}`);
  },
  changeDocumentsStatus(payload) {
    return Client.post(
      `${financialsResource}${documentsResource}${statusDocumentsResource}`,
      payload
    );
  },
  getClubSnapshotReport(clubId) {
    return Client.get(`${financialSnapshotReport}/${clubId}`);
  },
  getSnapshotWithCurrencyReport( currency = '') {
    return Client.get(`${financialSnapshotReport}` + (currency !== '' ? `?selected_currency=${currency}` : ''));
  },
  getClubSnapshotWithCurrencyReport(clubId, currency = '') {
    return Client.get(`${financialSnapshotReport}/${clubId}` + (currency !== '' ? `?selected_currency=${currency}` : ''));
  },
};
