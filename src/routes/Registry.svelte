<script lang="ts">
    import { onMount } from "svelte";
    import Card from "../components/Card.svelte";
    import type { BasicNotice } from "../types/BasicNotice";
    import Pagination from "./../components/Pagination.svelte";

    const noticesLink = "https://ws-public.interpol.int/notices/v1/red?&resultPerPage=50&page=";
    let notices: BasicNotice[] = [];
    let paginatedNotices: BasicNotice[] = [];
    const numberOfPages = 50;

    async function fetchNotices() {
        try{
            let id = 1;
            while(id < numberOfPages){
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

    onMount(async () => {
        await fetchNotices();
        console.log(notices)
    });
</script>

<div class="flex flex-col items-center justify-center gap-3 p-4 text-white">
    <h1 class="text-3xl sm:text-4xl md:text-5xl text-center text-white">Criminals Registry</h1>
    <p class="text-base md:text-lg flex justify-center text-gray text-center">Browse and manage detailed records of offenders with advanced sorting and filtering options.</p>
</div>
<div class="flex flex-col justify-center">
    <div class="flex justify-center gap-6 flex-wrap p-4">
        {#each paginatedNotices as criminal (criminal.entity_id)}
            <Card
                name={criminal?.name + " " + criminal?.forename || ""}
                id={criminal?.entity_id?.replace("/", "-") || ""}
                profilePicturePath={criminal?._links.thumbnail?.href || ""}
                nationalities={criminal?.nationalities || []}
                dateOfBirth={criminal?.date_of_birth || ""}
            />
        {/each}
    </div>
    <div class="flex items-center justify-center">
        <Pagination rows={notices} perPage={10} bind:trimmedRows={paginatedNotices} />
    </div>
</div>
