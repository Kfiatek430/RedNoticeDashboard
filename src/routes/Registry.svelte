<script lang="ts">
    import Card from "../components/Card.svelte";
</script>

<div class="flex flex-col items-center justify-center gap-3 p-4 text-white">
    <h1 class="text-3xl sm:text-4xl md:text-5xl text-center text-white">Criminals Registry</h1>
    <p class="text-base md:text-lg flex justify-center text-gray text-center">Browse and manage detailed records of offenders with advanced sorting and filtering options.</p>
</div>
    
<div class="flex justify-center gap-6 flex-wrap p-4">
    {#each new Array(16) as _}
        <Card />
    {/each}
</div>
