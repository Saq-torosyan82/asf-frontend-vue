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
            label: 'Match day',
            backgroundColor: '#3A9EBA',
            data: [34, 22, 20],
          },
          {
            type: 'bar',
            label: 'Broadcasting',
            backgroundColor: '#59CDEC',
            data: [50, 70, 60],
          },
          {
            type: 'bar',
            label: 'Player loans',
            backgroundColor: '#FAD61B',
            data: [24, 12, 10],
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
              stacked: true,
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
              stacked: true,
              //categoryPercentage: 0.5,
              categoryPercentage: 0.5,
              barPercentage: 0.7,
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
