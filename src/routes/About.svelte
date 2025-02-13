<script lang="ts">
  import { onMount } from "svelte";
  // @ts-ignore
  import Chart from "chart.js/auto";

  interface Contributor {
    author: {
      login: string;
    };
    total: number;
  }

  let contributors: { name: string; commits: number }[] = [];
  let chart: Chart | null = null;

  async function fetchContributors() {
    try {
      const res = await fetch(
        "https://api.github.com/repos/Kfiatek430/RedNoticeDashboard/stats/contributors"
      );
      if (!res.ok) throw new Error("Błąd pobierania danych");

      const data: Contributor[] = await res.json();

      contributors = data
        .map((contributor) => ({
          name: contributor.author.login,
          commits: contributor.total,
        }))
        .sort((a, b) => b.commits - a.commits)
        .slice(0, 10);

      renderChart();
    } catch (error) {
      console.error("Nie udało się pobrać danych:", error);
    }
  }

  function renderChart() {
    const ctx = document.getElementById(
      "contributorsChart"
    ) as HTMLCanvasElement | null;
    if (!ctx) return;

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: contributors.map((c) => c.name),
        datasets: [
          {
            label: "Liczba commitów",
            data: contributors.map((c) => c.commits),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  onMount(fetchContributors);
</script>

<div class="flex flex-col items-center justify-center gap-3 p-4 text-white">
  <h1 class="text-3xl sm:text-4xl md:text-5xl text-center text-white">About</h1>
  <p class="text-base md:text-lg flex justify-center text-gray text-center">
    This is a school project for Aplikacje Klienckie i Serwerowe, built using
    Svelte to demonstrate modern web application development.
  </p>
</div>

<h2 class="text-3xl md:text-4xl text-white text-center">Contributors</h2>
<canvas id="contributorsChart" class="p-5 md:p-10"></canvas>