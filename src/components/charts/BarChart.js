import { Bar } from "vue-chartjs";

export default {
  extends: Bar,

  mounted() {
    // Overwriting base render method with actual data.

    this.renderChart(
      {
        labels: ["2016", "2017", "2018", "2019", "2020"],
        datasets: [
          {
            type: "line",
            fill: false,
            label: "Profit on player sales",
            borderColor: "#FAD61B",
            pointBackgroundColor: "#FAD61B",

            data: [5, 15, 10, 10, 13],
          },
          {
            type: "bar",
            label: "Profit/loss before tax",
            backgroundColor: "#4289DA",
            data: [-3, 31, -8, -24, -12],
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
                color: "#EFEFEF",
                zeroLineColor: "#EFEFEF",
              },
              ticks: {
                fontColor: "#B6C3D1",
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
                fontColor: "#B6C3D1",
              },
            },
          ],
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            boxWidth: 6,
            fontSize: 11,
            fontColor: "#253242",
            fontStyle: 600,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    );
  },
};
