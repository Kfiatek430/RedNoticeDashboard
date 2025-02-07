<script lang="ts">
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";

    let portfolio;
    const data = {
        labels: ["Expenses", "Savings", "Investments"],
        datasets: [
            {
                label: "My First Dataset",
                data: [300, 50, 100],
                backgroundColor: ["#7000e1", "#fc8800", "#00b0e8"],
                // hoverOffset: 4,
                borderWidth: 0,
            },
        ],
    };
    const config = {
        type: "bar",
        data: data,
        options: {
            responsive: true,
            cutout: "95%",
            spacing: 2,
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
                    text: "My Personal Portfolio",
                },
            },
        },
    };
    onMount(() => {
        const ctx = portfolio!.getContext("2d");
        var myChart = new Chart(ctx, config);
    });
</script>

<div class="flex flex-col items-center justify-center gap-3 p-4 text-white">
    <h1 class="text-3xl sm:text-4xl md:text-5xl text-center text-white">
        Statistics
    </h1>
    <p class="text-base md:text-lg flex justify-center text-gray text-center">
        Explore comprehensive crime statistics with tools for filtering and data
        analysis.
    </p>

    <canvas bind:this={portfolio} width={400} height={400} />
</div>
