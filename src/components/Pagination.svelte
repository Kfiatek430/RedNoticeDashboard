<script>
    export let rows;
    export let perPage;
    export let trimmedRows;

    $: totalRows = rows.length 
    $: currentPage = 0
    $: totalPages = Math.ceil(totalRows / perPage) 
    $: start =  currentPage * perPage
    $: end = currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1  ;

    $: trimmedRows = rows.slice(start, end + 1);

    $: totalRows, currentPage = 0
    $: currentPage, start, end

</script>

    {#if totalRows && totalRows > perPage}
        <div class='pagination'>
            <button on:click={() => currentPage -= 1} 
                disabled={currentPage === 0 ? true : false} 
                aria-label="left arrow icon" 
                aria-describedby="prev">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                </svg>
            </button>
            <span id='prev' class='sr-only'>Load previous {perPage} rows</span>
            <p>{start + 1} - {end + 1} of {totalRows}</p>
            <button on:click={() => currentPage += 1} 
                disabled={currentPage === totalPages - 1 ? true : false} 
                aria-label="right arrow icon" 
                aria-describedby="next">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                </svg>
            </button>
            <span id='next' class='sr-only'>Load next {perPage} rows</span>
        </div>
    {/if}


<style>
    .sr-only {
      position: absolute;
      clip: rect(1px, 1px, 1px, 1px);
      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
    }
    
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: all;
    }

    .pagination button {
        background-color: var(--primary-color);
        color: var(--accent-color);
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        color: white;
    }

    .pagination p {
        margin: 0 1rem;
        color: white;
    }
	
	button {
		display: flex;
	}
	
</style>