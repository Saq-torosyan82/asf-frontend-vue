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
  mounted() {
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
              stacked: true,
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
              stacked: true,
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
