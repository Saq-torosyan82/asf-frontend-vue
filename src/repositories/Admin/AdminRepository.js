import Client from "../Clients/AxiosClient";

const resource = '/admin';

const getLendersResource = '/lenders';
const getAthletesResource = '/athletes';
const getAgentsResource = '/agents';
const getOrganisationsResource = '/organisations';


export default {
    getLenders() {
        return Client.get(`${resource}${getLendersResource}`);
    },
    getAthletes(btid) {
        if(btid) {
            return Client.get(`${resource}${getAthletesResource}?btid=${btid}`);
        }
        return Client.get(`${resource}${getAthletesResource}`);
    },
    getAgents(btid) {
        if(btid) {
            return Client.get(`${resource}${getAgentsResource}?btid=${btid}`);
        }
        return Client.get(`${resource}${getAgentsResource}`);
    },
    getOrganisations() {
        return Client.get(`${resource}${getOrganisationsResource}`);
    },

}
