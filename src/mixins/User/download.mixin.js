
import axios from "axios";

export default {
    data() {
        return {
            previewFile: null,
            fileMime: ''
        }
    },
    methods: {
        closePreview() {
            this.previewFile = null;
            this.fileMime = '';
        },
        viewFile(url) {
            let $this = this;
            $this.$loading(true);
            axios({
                url: url,
                method: 'GET',
                responseType: 'blob',
            }).then((response, status, xhr) => {
                let fileName = response.request.getResponseHeader('filename');
                $this.fileMime = response.request.getResponseHeader('filemime');
                let fileURL = URL.createObjectURL(new Blob([response.data], { type: $this.fileMime }));
                $this.previewFile = fileURL;
                $this.$loading(false);

            });
        },
        downloadFile(url) {
            let $this = this;
            $this.$loading(true);
            axios({
                url: url,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                let fileName = response.request.getResponseHeader('filename');
                $this.fileMime = response.request.getResponseHeader('filemime');
                let fileURL = URL.createObjectURL(new Blob([response.data], { type: $this.fileMime }));
                let fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', fileName);
                document.body.appendChild(fileLink);
                fileLink.click();
                $this.$loading(false);
            });
        }
    }
}