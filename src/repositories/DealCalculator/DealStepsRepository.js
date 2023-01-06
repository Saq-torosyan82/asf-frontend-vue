import Client from "../Clients/AxiosClient";

const tvRightsHoldersResource = '/system/tv-rights-holders';
const brandsResource = '/system/sport-brands';
const sponsorsResource = '/system/sport-sponsors';
const leaguesResource = '/system/sport-leagues?search=sport_id:zKk6P7lWD2ABeRwDVnEr8obgmN4pYjJ0'; // SEEMEk: not ok !!!
const leaguesBySportResource = '/system/sport-leagues?search=sport_id:'; // SE
const clubsResource = '/system/sport-clubs?search=league_id';
const dealsResource = '/deals';
const interestRatesResource = '/interest-rates';

export default {
    getTvRightsHolders() {
        return Client.get(`${tvRightsHoldersResource}`);
    },
    getBrands () {
        return Client.get(`${brandsResource}`);
    },
    getSponsors () {
        return Client.get(`${sponsorsResource}`);
    },
    getLeagues () {
        return Client.get(`${leaguesResource}`);
    },
    getLeaguesBySportId (sportId) {
        return Client.get(`${leaguesBySportResource}${sportId}`);
    },
    getClubs (leagueId) {
        return Client.get(`${clubsResource}:${leagueId}`);
    },
    getInterestRates(type, id) {
        return Client.get(`${interestRatesResource}/${type}/${id}`);
    },
}