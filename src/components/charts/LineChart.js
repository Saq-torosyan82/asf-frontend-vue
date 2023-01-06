import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  // props: ['chartData', 'options'],
  props: {
    chartData: {
      type: Array,
      default: new Array(),
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
        labels: ['1w', '2w', '3w', '4w', '5w', '6w'],

        datasets: [
          {
            label: 'Data',
            backgroundColor: this.gradient,
            borderColor: '#369EBA',
            data: [...this.chartData],
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
              display: false,
            },
          ],
          xAxes: [
            {
              fontColor: '#060708',
              lineWidth: '1px',
              position: 'top',
              gridLines: {
                color: 'rgba(239, 239, 239, 1)',
                zeroLineColor: 'rgba(239, 239, 239, 1)',
                drawBorder: false,
              },

              ticks: {
                fontColor: '#060708',
              },
            },
          ],
        },
      }
    );
  },
};
