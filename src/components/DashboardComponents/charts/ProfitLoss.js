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
            type: 'line',
            fill: false,
            label: 'Profit on player sales',
            borderColor: '#59CCEC',
            pointBackgroundColor: '#59CCEC',

            data: [2, -10, 15],
          },
          {
            type: 'bar',
            label: 'Profit/loss before tax',
            backgroundColor: '#FAD030',
            data: [-8, -24, 12],
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
              categoryPercentage: 1,
              barPercentage: 0.5,
              maxBarThickness: 25,
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
