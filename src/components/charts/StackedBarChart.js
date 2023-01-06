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
            type: "bar",
            label: "Match day",
            backgroundColor: "#4289DA",
            data: [100, 120, 125, 130, 140],
          },
          {
            type: "bar",
            label: "Broadcasting",
            backgroundColor: "#72B1F0",
            data: [100, 115, 120, 130, 220],
          },
          {
            type: "bar",
            label: "Commercial",
            backgroundColor: "#B6DAFF",
            data: [100, 125, 110, 220, 120],
          },
          {
            type: "bar",
            label: "Player loans",
            backgroundColor: "#FAD61B",
            data: [20, 25, 27, 30, 35],
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
              categoryPercentage: 1,
              barPercentage: 0.5,
              maxBarThickness: 25,
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
