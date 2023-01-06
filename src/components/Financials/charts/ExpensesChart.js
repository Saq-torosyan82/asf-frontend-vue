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
            label: 'Staff costs',
            backgroundColor: '#4289DA',
            data: [10, 51, 18, 34, 22],
          },
          {
            type: 'bar',
            label: 'Other costs',
            backgroundColor: '#B6DAFF',
            data: [3, 31, 8, 24, 12],
          },
          {
            type: 'line',
            fill: false,
            label: 'Revenue',
            borderColor: '#FAD61B',

            pointBackgroundColor: '#FAD61B',
            data: [55, 65, 70, 50, 70],
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
