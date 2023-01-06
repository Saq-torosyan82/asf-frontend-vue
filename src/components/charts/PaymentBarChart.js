import { Bar } from 'vue-chartjs';
import store from '@/store';
export default {
  extends: Bar,
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            type: 'bar',
            label: 'Gross amount',
            backgroundColor: '#4289DA',
            data: [],
          },
        ],
      },
    };
  },
  mounted() {
    this.mapPaymentEntries();
    this.paymentChart();
  },
  methods: {
    mapPaymentEntries() {
      let paymentEntries = store.getters['dealDetail/getPaymentRates'];
      let $this = this;
      paymentEntries.map((item) => {
        $this.chartData.labels.push(
          $this.$moment(new Date(item.paymentDate)).format('DD.MM.YYYY')
        );
        $this.chartData.datasets[0].data.push(parseFloat(item.grossAmount));
      });
    },
    paymentChart() {
      this.renderChart(this.chartData, {
        title: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: '#EFEFEF',
                zeroLineColor: '#EFEFEF',
              },
              ticks: {
                precision: 0,
                fontColor: '#B6C3D1',
                fontSize: 10,
              },
            },
          ],
          xAxes: [
            {
              categoryPercentage: 0.5,
              barPercentage: 1,
              maxBarThickness: 25,
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: '#B6C3D1',
                fontSize: 10,
              },
            },
          ],
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 6,
            fontSize: 11,
            fontColor: '#253242',
            fontStyle: 600,
          },
        },
        labels: {
          fontSize: 19,
        },
        responsive: true,
        maintainAspectRatio: false,
      });
    },
  },
};
