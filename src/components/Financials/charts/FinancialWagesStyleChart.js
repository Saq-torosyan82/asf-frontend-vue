import { Bar } from 'vue-chartjs';
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';
window.Chart.plugins.unregister(ChartJsPluginDataLabels);
export default {
  extends: Bar,
  props: {
    chartData: {
      type: Object,
      default: new Object(),
    },
  },
  mounted() {
    this.renderChart(
      { ...this.chartData },
      {
        title: {
          display: true,
        },
        scales: {
          yAxes: [
            {
              stacked: false,
              gridLines: {
                drawBorder: false,
                color: '#EFEFEF',
                zeroLineColor: '#EFEFEF',
              },
              ticks: {
                fontColor: '#C6CBCC',
              },
            },
          ],
          xAxes: [
            {
              stacked: false,
              categoryPercentage: 1,
              barPercentage: 0.5,
              maxBarThickness: 25,
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
        responsive: true,
        maintainAspectRatio: false,
      }
    );
  },
};
