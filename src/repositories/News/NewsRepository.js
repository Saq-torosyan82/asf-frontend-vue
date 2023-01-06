import Client from "../Clients/AxiosClient";

const resource = '/system';
const meResource = '/me';
const newsResource = '/news';
const sportNewsResource = '/sport-news';
const sportResource = '/sports';
const countryResource = '/countries';

export default {
    getSportNews(sport, next, prev) {
        let url = `${resource}${sportNewsResource}`

        if(sport){
            for (let i = 0; i < sport.length; i++) {
                if(i == 0){
                    url += `?sports[${i}]=${sport[i].id}`
                    continue
                }
                url += `&sports[${i}]=${sport[i].id}`
            }
        }

        if (next){
            url = next
        }else if (prev){
            url = prev
        }
        return Client.get(url);
    },
    getSport() {
        return Client.get(`${resource}${sportResource}`);
    },
    getCountry() {
        return Client.get(`${resource}${countryResource}`);
    },
    saveSport(payload) {
        if(payload.length === 0){
            payload = [""]
        }
        return Client.post(`${meResource}${newsResource}${sportResource}`,{
            sports: payload
        });
    },
    getSavedSports() {
        return Client.get(`${meResource}${newsResource}${sportResource}`);
    }
}
