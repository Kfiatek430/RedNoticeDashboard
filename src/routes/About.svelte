<script lang="ts">
  import { onMount, tick } from "svelte";
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
  let dataFetched: boolean = false;

  async function fetchContributors() {
    try {
      const res = await fetch(
        "https://api.github.com/repos/Kfiatek430/RedNoticeDashboard/stats/contributors"
      );

      if (res.status === 202) {
        console.warn("Statystyki są jeszcze generowane, ponawiam próbę za 3 sekundy...");
        setTimeout(fetchContributors, 3000);
        return;
      }

      if (!res.ok) {
        throw new Error("Błąd pobierania danych");
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Otrzymane dane nie są tablicą: " + JSON.stringify(data));
      }

      contributors = data
        .map((contributor: Contributor) => ({
          name: contributor.author.login,
          commits: contributor.total,
        }))
        .sort((a, b) => b.commits - a.commits)
        .slice(0, 10);

      dataFetched = true;

      await tick();
      renderChart();
    } catch (error) {
      console.error("Nie udało się pobrać danych:", error);
    }
  }

  function renderChart() {
    const ctx = document.getElementById("contributorsChart") as HTMLCanvasElement | null;
    if (!ctx) {
      console.error("Nie znaleziono elementu canvas");
      return;
    }

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
    This is a school project for Aplikacje Klienckie i Serwerowe, built using Svelte to demonstrate modern web application development.
  </p>
</div>

{#if dataFetched}
  <h2 class="text-3xl md:text-4xl text-white text-center">Contributors</h2>
  <canvas id="contributorsChart" class="p-5 md:p-10"></canvas>
{/if}
