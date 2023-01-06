import Client from "../Clients/AxiosClient";

const mainPath = '/system/';

const countriesResource = mainPath + 'countries';
const countryByIdResource = countriesResource + '?search=id';

const borrowerTypeResource = mainPath + 'borrower-types';

const sportsResource = mainPath + 'sports';
const sportByIdResource = sportsResource + '?search=id';

const leaguesResource = mainPath + 'sport-leagues';
const leagueByIdResource = leaguesResource + '?search=id';


const tvRightsHoldersResource = mainPath + 'tv-rights-holders';
const brandsResource = mainPath + 'sport-brands';
const sponsorsResource = mainPath + 'sport-sponsors';
const lenderCriteriaResource = mainPath + 'lender-criteria';

const clubsResource = mainPath + 'sport-clubs';
const clubByIdResource = clubsResource + '?search=id';

const clubsCountryResource = mainPath + 'club-countries';
const sportCountryResource = mainPath + 'sport-countries';

// SEEMEk: fix here somehow !!
const clubsResource2 = '/system/sport-clubs?search=league_id';

export default {
    createSponsor(payload) {
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return Client.post(`${sponsorsResource}`, payload, config);
    },
    createBrand(payload) {
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return Client.post(`${brandsResource}`, payload, config);
    },
    createLeague(payload) {
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return Client.post(`${leaguesResource}`, payload, config);
    },
    createClubs(payload) {
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return Client.post(`${clubsResource}`, payload, config);
    },
    getCountries() {
        return Client.get(`${countriesResource}`);
    },
    getCountryById(id) {
        // SEEMEk: use cache !!
        return Client.get(`${countryByIdResource}:${id}`);
    },
    getCountriesBySport(sport) {
        return Client.get(`${clubsCountryResource}?search=clubs.league.sport_id:${sport}`);
    },
    // Is duplicate of getCountriesBySport, need to be sure if we can use just one for all features ,
    // at the moment we are not sure , this is the reason why we have duplicate endpoint
    getCountriesBySportId(sportId) {
        return Client.get(`${sportCountryResource}/${sportId}`);
    },
    getBorrowerTypes() {
        return Client.get(`${borrowerTypeResource}`);
    },
    getSports() {
        return Client.get(`${sportsResource}`);
    },
    getSportById(id) {
        // SEEMEk: use cache !!
        return Client.get(`${sportByIdResource}:${id}`);
    },
    getSportCountries(id) {
        return Client.get(`${sportCountryResource}/${id}`);
    },
    getTvRightsHolders() {
        return Client.get(`${tvRightsHoldersResource}`);
    },
    getBrands() {
        return Client.get(`${brandsResource}`);
    },
    getSponsors() {
        return Client.get(`${sponsorsResource}`);
    },
    getLeagues() {
        return Client.get(`${leaguesResource}`);
    },
    getLeagueById(id) {
        // SEEMEk: use cache !!
        return Client.get(`${leagueByIdResource}:${id}`);
    },
    getLeaguesByCountryAndSport(country, sport) {
        let searchQuery = `?search=SportClubs.`;
        if(country !== '' && sport !== '') {
            searchQuery += `country_id:${country};sport_id:${sport}&searchJoin=and`;
        } else if(sport !== '' && country === '') {
            searchQuery += `sport_id:${sport}`;
        }else if(country !== '' && sport === '') {
            searchQuery += `country_id:${country}`;
        }
        return Client.get(`${leaguesResource}${searchQuery}`);
    },
    getClubs(leagueId) {
        return Client.get(`${clubsResource2}:${leagueId}`);
    },
    getAllClubs() {
        return Client.get(`${clubsResource}`);
    },
    getClubById(id) {
        // SEEMEk: use cache !!
        return Client.get(`${clubByIdResource}:${id}`);
    },
    getClubsByCountryAndLeague(country, league) {
        let searchQuery = `?search=`;
        if(country !== '' && league !== '') {
            searchQuery += `country_id:${country};league_id:${league}&searchJoin=and`;
        } else if(league !== '' && country === '') {
            searchQuery += `league_id:${league}`;
        }else if(country !== '' && league === '') {
            searchQuery += `country_id:${country}`;
        }
        return Client.get(`${clubsResource}${searchQuery}`);
    },
    getClubsByCountryAndSport(country, sport) {
        let searchQuery = `?search=`;
        if(country !== '' && sport !== '') {
            searchQuery += `country_id:${country};sport_id:${sport}&searchJoin=and`;
        } else if(sport !== '' && country === '') {
            searchQuery += `sport_id:${sport}`;
        }else if(country !== '' && sport === '') {
            searchQuery += `country_id:${country}`;
        }
        return Client.get(`${clubsResource}${searchQuery}`);
    },
    getClubsBySport(sport) {
        return Client.get(`${clubsResource}?search=sport_id:${sport}`);
    },
    getLenderCriteria() {
        return Client.get(`${lenderCriteriaResource}`);
    }
}