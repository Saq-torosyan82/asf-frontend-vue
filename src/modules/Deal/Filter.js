import store from "@/store"

export default {
    getQuery(data, filters, query) {
        if (data.length > 0) {
            data.map(function (key, index) {
                if (filters[key] !== '')
                    query += '' + key + ':' + filters[key] + '';
                if (index < data.length - 1) query += ';';
            });
            if (data.length >= 2) {
                query += '&searchJoin=and';
            } else {
                query.replace('&searchJoin=and', '');
            }
           return query;
        }

        return '';
    }}