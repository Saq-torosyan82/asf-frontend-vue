<template>
  <div class="content">
    <header-navigation></header-navigation>
    <div class="title-section">
      <span class="pre-url-txt" @click="goToFinancialOverview"
      >Financial overview >
      </span>
      <span class="cur-url-txt">Snapshot Report</span>
    </div>
    <a class="link-text" @click="exportPdf()"><img src="@/assets/img/download-icon.png" alt="" />Download</a>
    <TotalSnapshotReport :fullSnapshotData="fullSnapshotReport" @selectedCurrency="onSelectedCurrency" :forPrint="false" :clubId="clubId"/>
    <VueHtml2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="false"
      :paginate-elements-by-height="1600"
      filename="Snapshot"
      @progress="generatePdfProgress"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="landscape"
      pdf-content-width="100%"
      :html-to-pdf-options="this.htmlToPdfOptions"
      ref="html2Pdf"
    >
      <section slot="pdf-content" id="pdf-content-missed" class="pdf-content">
        <TotalSnapshotReport :fullSnapshotData="fullSnapshotReport" @selectedCurrency="onSelectedCurrency" :forPrint="true" :clubId="clubId"/>
      </section>
    </VueHtml2pdf>
  </div>
</template>
<script>
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import TotalSnapshotReport from '@/components/Financials/snapshot-report/TotalSnapshotReport.vue';
import FinancialRepository from '@/repositories/Financials/FinancialRepository';
import ExportPDFMixin from '@/mixins/DealCalculator/ExportPDF.mixin';
import VueHtml2pdf from 'vue-html2pdf';
export default {
  components: {
    HeaderNavigation,
    TotalSnapshotReport,
    VueHtml2pdf
  },
  mixins: [ExportPDFMixin],
  data() {
    return {
      fullSnapshotReport: {},
      htmlToPdfOptions: {
        margin: [0.8, 0.5],
        filename: 'Snapshot-' + this.clubId +'.pdf',
        image: {
          type: 'png',
          quality: 0.98,
        },
        enableLinks: true,
        jsPDF: {
          unit: 'cm',
          format: 'a4',
          orientation: 'landscape'
        }
      },
    };
  },
  props: ['clubId'],
  created() {
    this.getSnapshotReport();
  },
  methods: {
    getSnapshotReport() {
      let $this = this;
      $this.$loading(true);
      FinancialRepository.getClubSnapshotReport(this.clubId)
        .then((res) => {
          this.fullSnapshotReport = { ...res.data };
          $this.$loading(false);
        })
        .catch((err) => {
          console.error(err);
          $this.$loading(false);
        });
    },
    onSelectedCurrency(currency) {
      let $this = this;
      $this.$loading(true);
      FinancialRepository.getClubSnapshotWithCurrencyReport(this.clubId, currency)
          .then((res) => {
            this.fullSnapshotReport = res.data;
            $this.$loading(false);
          })
          .catch((err) => {
            console.error(err);
            $this.$loading(false);
          });
    },
    goToFinancialOverview() {
      this.$router.go(-1)
    },

  },
};
</script>
<style
    lang="scss"
    scoped
    src="@/assets/styles/financial/snapshot-report.scss"
></style>
