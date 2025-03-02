<script lang="ts">
  import { onMount } from "svelte";
  import Card from "../components/Card.svelte";
  import type { BasicNotice } from "../types/BasicNotice";
  import Pagination from "./../components/Pagination.svelte";
  import { searchQuery } from "../stores/searchStore";

  let paginatedNotices: BasicNotice[] = [];
  let currentPage = 0;

  searchQuery.subscribe((value) => {
    paginatedNotices = value;
    currentPage = 0; 
  });

  const noticesLink = "https://ws-public.interpol.int/notices/v1/red?&resultPerPage=50&page=1";

  async function fetchNotices() {
    try {
      const response = await fetch(noticesLink);
      const data = await response.json();
      searchQuery.set(data._embedded.notices);
    } catch (error) {
      console.error(error);
    }
  }

  onMount(async () => {
    await fetchNotices();
  });
</script>

<div class="flex flex-col items-center justify-center gap-3 p-4 text-white">
  <h1 class="text-3xl sm:text-4xl md:text-5xl text-center text-white">
    Criminals Registry
  </h1>
  <p class="text-base md:text-lg flex justify-center text-gray text-center">
    Browse and manage detailed records of offenders.
  </p>
</div>
<div class="flex flex-col justify-center">
  {#if paginatedNotices.length === 0}
    <p class="text-white text-center text-3xl sm:text-4xl md:text-5xl">
      Criminals Not Found
    </p>
  {:else}
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
      <Pagination
        rows={$searchQuery}
        perPage={10}
        bind:trimmedRows={paginatedNotices}
        bind:currentPage
      />
    </div>
  {/if}
</div>
