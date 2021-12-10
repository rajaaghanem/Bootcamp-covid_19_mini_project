const canvasChart = document.querySelector(".data_container_chart");

export let myChart ="";

// creating the contient chart.
export function buildChart(dataArray, nameOfcontient) {
    // myChart.destroy();
    myChart = new Chart(canvasChart, {
      type: "bar",
      data: {
        labels: [
          "Deaths",
          "Confirmed Cases",
          "Critical Cases",
          "Recovered Cases",
        ],
        datasets: [
          {
            label: `${nameOfcontient}`,
            data: dataArray,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
            display: 'true',
            text: 'Custom Chart Title',
            fontColor: '#333',

        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }