export default {
    parseNum(value) {
        if (value === '') {
            return 0;
        } else if (typeof value === 'string') {
            return Number(value.replace(/,/g, ''));
        } else {
            return Number(value);
        }
    },
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}