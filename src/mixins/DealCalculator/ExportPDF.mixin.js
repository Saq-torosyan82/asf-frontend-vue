
export default {
    methods: {
        generatePdfProgress(progress) {
            if(progress < 100) {
                this.$loading(true);
            }else {
                this.$loading(false);
            }
        },
        exportPdf () {
            this.$loading(true);
            this.$refs.html2Pdf.generatePdf()
        },
    }
}