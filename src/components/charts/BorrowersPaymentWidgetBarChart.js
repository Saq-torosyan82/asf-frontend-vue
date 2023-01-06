import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  // props: ['chartData', 'options'],
  props: {
    chartData: {

      default: new Object(),
    },
  },
  methods: {
    update() {
      this.$data._chart.update();
    },
  },
  data() {
    return {
      gradient: null,
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 300);
    this.gradient.addColorStop(0.2, 'rgba(23, 175, 217, 1)');
    this.gradient.addColorStop(0.5, 'rgba(132, 226, 253, 1)');

    this.renderChart(
      {
        labels: [...Object.keys(this.chartData)],

        datasets: [
          {
            label: 'Installments',
            backgroundColor: '#17AFD9',
            data: [
              ...Object.keys(this.chartData).map(
                (key) => this.chartData[key].installments
              ),
            ],
          },
          {
            label: 'Paid Installments',
            backgroundColor: '#FAD030',
            data: [
              ...Object.keys(this.chartData).map(
                (key) => this.chartData[key].paid_installments
              ),
            ],
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,

        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                min: 0,
                stepSize: 3,
              },

              gridLines: {
                color: 'rgba(239, 239, 239, 1)',
                zeroLineColor: 'rgba(239, 239, 239, 1)',
                drawBorder: false,
              },
            },
          ],

          xAxes: [
            {
              stacked: true,
              fontColor: '#060708',
              lineWidth: '1px',
              position: 'bottom',
              barThickness: 32,
              ticks: {
                display: false,
                maxRotation: 0,
                fontColor: '#060708',
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      }
    );
  },
};
