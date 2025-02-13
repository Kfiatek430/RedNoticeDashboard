<script>
    export let rows;
    export let perPage;
    export let trimmedRows;

    $: totalRows = rows.length;
    $: totalPages = Math.ceil(totalRows / perPage);
    
    let currentPage = 0;
    let userInputPage = currentPage + 1; 

    $: start = currentPage * perPage;
    $: end = currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1;
    $: trimmedRows = rows.slice(start, end + 1);

    $: userInputPage = currentPage + 1;

    async function goToPage() {
        // @ts-ignore
        let page = parseInt(userInputPage, 10) - 1;
        if (!isNaN(page) && page >= 0 && page < totalPages) {
            currentPage = page;
        } else {
            userInputPage = currentPage + 1; 
        }
    }

    /**
	 * @param {number} step
	 */
    async function changePage(step) {
        if (currentPage + step >= 0 && currentPage + step < totalPages) {
            currentPage += step;
        }
    }
</script>

{#if totalRows && totalRows > perPage}
    <div class='pagination'>
        <button on:click={() => changePage(-1)} 
            disabled={currentPage === 0} 
            aria-label="Previous Page">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
            </svg>
        </button>

        <span><input type="number" bind:value={userInputPage} min="1" max="{totalPages}" 
            on:keydown={(e) => e.key === 'Enter' && goToPage()} /> of {totalPages}</span>

        <button on:click={() => changePage(1)} 
            disabled={currentPage === totalPages - 1} 
            aria-label="Next Page">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
            </svg>
        </button>
    </div>
{/if}

<style>
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .pagination input {
        width: 30px;
        text-align: center;
        background-color: transparent;
        color: white;
        outline: none;
        transition: border-color 0.3s ease, background-color 0.3s ease;  
        border: none;
        padding: 0.2rem;
    }

    .pagination input:focus {
    box-shadow: 0 0 5px rgba(0, 81, 255, 0.7);
    border: 2px solid #006aff;
}

    .pagination input::-webkit-outer-spin-button,
    .pagination input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .pagination input[type="number"] {
        -moz-appearance: textfield;
    }

    .pagination span {
        background-color: transparent;
        color: white;
        margin-right: 5px;
    }
</style>
