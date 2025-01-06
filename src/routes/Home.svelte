<script lang="ts">
    import Card from "../components/Card.svelte";
</script>

<div class="flex flex-col items-center justify-center gap-3 p-4 text-white">
    <h1 class="text-3xl sm:text-4xl md:text-5xl text-center text-white">Red Notice Dashboard</h1>
    <p class="text-base md:text-lg flex justify-center text-gray text-center">The fastest way to browse data on wanted persons from the Interpol API.</p>
</div>

<div class="flex justify-center gap-6 flex-wrap">
{#each new Array(15) as _, i}
    <Card />
{/each}
</div>