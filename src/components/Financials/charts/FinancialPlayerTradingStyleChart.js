import { Bar } from 'vue-chartjs';
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';
export default {
  extends: Bar,
  props: {
    chartData: {
      type: Object,
      default: new Object(),
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.filLData()
      }
    }
  },
  methods: {
    filLData() {
      this.addPlugin(ChartJsPluginDataLabels);
      this.renderChart(
          { ...this.chartData },
          {
            plugins: {
              datalabels: {
                color: '#060708',
                anchor: 'end',
                font: {
                  weight: 'normal',
                  size: 8,
                },
              },
            },
            title: {
              display: true,
            },
            scales: {
              yAxes: [
                {
                  stacked: false,
                  gridLines: {
                    drawBorder: false,
                    color: 'transparent',
                    zeroLineColor: '#666F72',
                  },
                  ticks: {
                    fontColor: 'transparent',
                  },
                },
              ],
              xAxes: [
                {
                  stacked: false,
                  categoryPercentage: 0.8,
                  barPercentage: 1,
                  maxBarThickness: 30,
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    fontColor: '#C6CBCC',
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
                fontColor: '#060708',
                fontStyle: 600,
                padding: 20,
              },
            },
            elements: {
              line: {
                tension: 0,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }
      );
    }
  },
  mounted() {
    this.filLData()
  },
};
