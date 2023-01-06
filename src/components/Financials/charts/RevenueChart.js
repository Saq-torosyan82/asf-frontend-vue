import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,

  mounted() {
    // Overwriting base render method with actual data.

    this.renderChart(
      {
        labels: ['17/18', '18/19', '19/20', 'Interim'],
        datasets: [
          {
            type: 'bar',
            label: 'Match day',
            backgroundColor: '#4289DA',
            data: [206, 234, 191, 55],
          },
          {
            type: 'bar',
            label: 'Broadcasting',
            backgroundColor: '#72B1F0',
            data: [120, 136, 142, 100],
          },
          {
            type: 'bar',
            label: 'Commercial',
            backgroundColor: '#B6DAFF',
            data: [111, 116, 131, 101],
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
              categoryPercentage: 1,
              barPercentage: 0.5,
              maxBarThickness: 25,
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
        responsive: true,
        maintainAspectRatio: false,
      }
    );
  },
};
