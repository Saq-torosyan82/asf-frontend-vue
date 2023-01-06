import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,

  mounted() {
    // Overwriting base render method with actual data.

    this.renderChart(
      {
        labels: ['2019', '2020', '2021'],
        datasets: [
          {
            type: 'bar',
            label: 'Gross debt',
            backgroundColor: '#59CCEC',
            data: [34, 22, 25],
          },
          {
            type: 'bar',
            label: 'Cash',
            backgroundColor: '#A0A0A0',
            data: [24, 12, 20],
          },
          {
            type: 'line',
            fill: false,
            label: 'Net debt/funds',
            borderColor: '#FAD030',

            pointBackgroundColor: '#FAD030',
            data: [45, 30, 35],
          },
        ],
      },
      {
        title: {
          display: false,
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
                fontColor: '#B6C3D1',
              },
            },
          ],
          xAxes: [
            {
              stacked: false,
              //categoryPercentage: 0.5,
              categoryPercentage: 0.5,
              barPercentage: 1,
              maxBarThickness: 40,
              //barThickness: 25,
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: '#B6C3D1',
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
  },
};
