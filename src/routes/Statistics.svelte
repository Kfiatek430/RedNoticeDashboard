<script lang="ts">
  import { onMount } from "svelte";
  import Chart, { type ChartConfiguration } from "chart.js/auto";
  import type { BasicNotice } from "../types/BasicNotice";

  const noticesLink =
    "https://ws-public.interpol.int/notices/v1/red?&resultPerPage=50&page=";
  let notices: BasicNotice[] = [];
  let chartData = [0, 0, 0, 0, 0, 0];
  let chartData2 = [0, 0, 0, 0, 0, 0, 0];
  async function fetchNotices() {
    try {
      let id = 1;
      while (id < 5) {
        const link = noticesLink + id;
        const response = await fetch(link);
        const data = await response.json();
        notices = notices.concat(data._embedded.notices);
        id++;
      }
    } catch (error) {
      console.error(error);
    }
  }
  function getChartData() {
    notices.forEach((e) => {
      let yearOfBirth = e.date_of_birth.substring(0, 4);
      let age = new Date().getFullYear() - Number(yearOfBirth);
      if (age <= 20) {
        chartData[0]++;
      } else if (age <= 25) {
        chartData[1]++;
      } else if (age <= 30) {
        chartData[2]++;
      } else if (age <= 40) {
        chartData[3]++;
      } else if (age <= 50) {
        chartData[4]++;
      } else if (age > 50) {
        chartData[5]++;
      }

      let countryCodes = e.nationalities;
      if (countryCodes) {
        if (countryCodes.includes("FR")) {
          chartData2[0]++;
        } else if (countryCodes.includes("CN")) {
          chartData2[1]++;
        } else if (countryCodes.includes("BZ")) {
          chartData2[2]++;
        } else if (countryCodes.includes("RU")) {
          chartData2[3]++;
        } else if (countryCodes.includes("JM")) {
          chartData2[4]++;
        } else if (countryCodes.includes("PL")) {
          chartData2[5]++;
        } else if (countryCodes.includes("GT")) {
          chartData2[6]++;
        }
      }
    });
  }

  let chart1;
  let chart2;
  const data2 = {
    labels: [
      "France",
      "China",
      "Belize",
      "Russian Federation",
      "Jamaica",
      "Poland",
      "Guatemala",
    ],
    datasets: [
      {
        label: "Amount",
        data: chartData2,
        backgroundColor: [
          "#37b067d9",
          "#6296bcd9",
          "#edb40dd9",
          "#7fd7c1d9",
          "#9f8caed9",
          "#eb6672d9",
          "#eafd88d9",
        ],
        borderWidth: 0,
      },
    ],
  };
  const config2: ChartConfiguration<"doughnut"> = {
    type: "doughnut",
    data: data2,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          display: true,
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 14,
            },
          },
        },
        title: {
          display: true,
          text: "Number of criminals of the selected country",
        },
      },
    },
  };
  const data = {
    labels: ["<=20", "<=25", "<=30", "<=40", "<=50", ">50"],
    datasets: [
      {
        label: "Amount",
        data: chartData,
        backgroundColor: [
          "#37b067d9",
          "#6296bcd9",
          "#edb40dd9",
          "#7fd7c1d9",
          "#9f8caed9",
          "#eb6672d9",
        ],
        borderWidth: 0,
      },
    ],
  };
  const config: ChartConfiguration<"bar"> = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          display: true,
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 14,
            },
          },
        },
        title: {
          display: true,
          text: "Number of criminals of the selected age",
        },
      },
    },
  };
  onMount(async () => {
    await fetchNotices();
    getChartData();

    const ctx = chart1!.getContext("2d");
    var myChart = new Chart(ctx, config);

    const ctx2 = chart2!.getContext("2d");
    var myChart2 = new Chart(ctx2, config2);
  });
</script>

<div class="flex flex-col items-center justify-center gap-3 p-4 text-white w-3/5">
  <h1 class="text-3xl sm:text-4xl md:text-5xl text-center text-white">
    Statistics
  </h1>
  <p class="text-base md:text-lg flex justify-center text-gray text-center">
    Explore comprehensive crime statistics.
  </p>

  <canvas
    bind:this={chart1}
    width={400}
    height={300}
    style="margin-bottom: 70px;"
  ></canvas>
  <canvas bind:this={chart2} width={250} height={250}></canvas>
</div>
