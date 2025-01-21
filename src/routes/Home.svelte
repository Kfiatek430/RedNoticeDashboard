<script lang="ts">
    import Card from "../components/Card.svelte";
    import type { BasicNotice } from "../types/BasicNotice";
    import { onMount } from "svelte";

    let notices: BasicNotice[] = [];
    const noticesLink = "https://ws-public.interpol.int/notices/v1/red?&resultPerPage=3&page=1";

    async function fetchNotices() {
        const response = await fetch(noticesLink);
        const data = await response.json();
        notices = data._embedded.notices;
    }

    onMount(async () => {
        await fetchNotices();
    });
</script>

<div class="flex flex-col items-center justify-center gap-3 p-4 text-white">
    <h1 class="text-3xl sm:text-4xl md:text-5xl text-center text-white">Red Notice Dashboard</h1>
    <p class="text-base md:text-lg flex justify-center text-gray text-center">A comprehensive solution for retrieving and browsing data on wanted individuals from Interpol's API.</p>
</div>

<div class="flex flex-col items-center justify-center gap-3 p-4 text-white">
    <h2 class="text-3xl md:text-4xl text-white text-center">Latest criminals</h2>
    
    <div class="flex justify-center gap-6 flex-wrap">
        {#each notices as criminal}
            <Card
                name={criminal.name + " " + criminal.forename}
                id={criminal.entity_id.replace("/", "-")}
                profilePicturePath={criminal._links.thumbnail.href}
                nationalities={criminal.nationalities}
                dateOfBirth={criminal.date_of_birth}
            />
        {/each}
    </div>
</div>
