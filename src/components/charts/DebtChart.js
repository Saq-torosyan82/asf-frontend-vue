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
            data: [72, 42, 30, 38, 33],
          },
          {
            type: "bar",
            label: "Grass debt",
            backgroundColor: "#4289DA",
            data: [72, 42, 30, 38, 33],
          },
          {
            type: "bar",
            label: "Cash",
            backgroundColor: "#B6DAFF",
            data: [5, 2, 6, 2, 3],
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
              categoryPercentage: 0.5,
              barPercentage: 1,
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
