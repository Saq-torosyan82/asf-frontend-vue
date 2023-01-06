export default {
    data() {
        return {
            validationRules: {
                upperCase: false,
                lowerCase: false,
                oneDigit: false,
                oneSpecialCharacter: false,
                min8Lenght: false,
            }
        }
    },
    methods: {
        checkPasswordRules() {
            var upperCase = new RegExp("(?=.*?[A-Z])");
            var lowerCase = new RegExp("(?=.*?[a-z])");
            var oneDigit = new RegExp("(?=.*?[0-9])");
            var oneSpecialCharacter = new RegExp("(?=.*?[#?!@$%^&*-])");
            var min8Lenght = new RegExp(".{8,}");

            this.validationRules.upperCase = upperCase.test(this.form.password);
            this.validationRules.lowerCase = lowerCase.test(this.form.password);
            this.validationRules.oneDigit = oneDigit.test(this.form.password);
            this.validationRules.oneSpecialCharacter = oneSpecialCharacter.test(this.form.password);
            this.validationRules.min8Lenght = min8Lenght.test(this.form.password);
        },
    }
}