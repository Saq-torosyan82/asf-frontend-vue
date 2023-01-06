import RepositoryFactory from '../../repositories/RepositoryFactory';

const DealCalculatorRepository = RepositoryFactory.get('deal-steps-repository');
const UserRepository = RepositoryFactory.get('user');

export default {
  data() {
    return {
      documents: null,
      documentsLabels: '',
    };
  },
  filters: {
    bytes: (num) => {
      if (typeof num !== 'number' || isNaN(num)) {
        throw new TypeError('Expected a number');
      }

      var exponent;
      var unit;
      var neg = num < 0;
      var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      if (neg) {
        num = -num;
      }

      if (num < 1) {
        return (neg ? '-' : '') + num + ' B';
      }

      exponent = Math.min(
        Math.floor(Math.log(num) / Math.log(1000)),
        units.length - 1
      );
      num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
      unit = units[exponent];

      return (neg ? '-' : '') + num + ' ' + unit;
    },
  },
  methods: {
    getUserDocuments() {
      let $this = this;
      $this.$loading(true);
      let contract_type = '';
      if ($this.contractType !== undefined) {
        contract_type = $this.contractType;
      }
      UserRepository.getUserDocuments({
        contract_type: contract_type,
      })
        .then((response) => {
          $this.documents = response.data;
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    getPersonalDocuments() {
      let $this = this;
      $this.$loading(true);
      let contract_type = '';
      if ($this.contractType !== undefined) {
        contract_type = $this.contractType;
      }
      UserRepository.getPersonalDocuments(contract_type)
        .then((response) => {
          $this.documents = response.data;
          $this.documentsLabels = '';
          response.data.forEach((doc) => {
            if(doc.is_multiple) {
                doc.data.forEach((doc) => {
                  $this.documentsLabels += doc.label +', ';
                })
            }else {
              $this.documentsLabels += doc.label +', ';
            }
          }
          );
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    pickDocument(event, data) {
      let file = event.target.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.uploadFile(file[0], data);
      }
    },
    pickDocuments(event, data) {
      let file = event.target.files;
      this.uploadFile(file, data);
    },
    removeDocument(ref) {
      this.documents[ref] = null;
    },
    dropFile(event, ref) {
      this.uploadFile(event.dataTransfer.files[0], { document_type: ref });
    },
    dropFiles(event, ref) {
      this.uploadFile(event.dataTransfer.files, { document_type: ref });
    },
    dragover(event) {
      event.currentTarget.classList.add('dragover');
    },
    dragleave(event) {
      event.currentTarget.classList.remove('dragover');
    },
    getFileType(type) {
      return type.split('/')[1].substring(0, 3).toUpperCase();
    },
    getFileExtension(fileName) {
      return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
    },
    uploadFile(file, data) {
      const formData = new FormData();

      const isIterable = (value) => {
        return Symbol.iterator in Object(value);
      };

      if (isIterable(file)) {
        let i = 0;
        for (let filex of file) {
          formData.append('file[' + i + ']', filex);
          i++;
        }
      } else {
        formData.append('file', file);
      }

      formData.append('nx_data', JSON.stringify(data));

      let $this = this;
      $this.$loading(true);
      UserRepository.uploadDocument(formData)
        .then((response) => {
          $this.$loading(false);
          $this.getPersonalDocuments();
          $this.$emit('updateList', true);
          $this.$emit('closed', true);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
          $this.$emit('closed', true);
        });
    },
  },
};
