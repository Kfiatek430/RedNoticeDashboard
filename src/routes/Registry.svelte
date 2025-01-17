<script lang="ts">
    import { onMount } from "svelte";
    import Card from "../components/Card.svelte";

    const noticesLink = "https://ws-public.interpol.int/notices/v1/red?&resultPerPage=50&page=1";
    let criminals = [];

    class Criminal {
        public name: string;
        public forename: string;
        public description: string;
        public dateOfBirth: string;
        public profilePicturePath: string;

        constructor(href: string) {
            this.fetchCriminalData(href);
            this.name = "Unknown";
            this.forename = "Unknown";
            this.description = "No description available.";
            this.dateOfBirth = "Unknown";
            this.profilePicturePath = href;
        }

        async fetchCriminalData(href: string) {

        }
    }

    async function fetchNotices() {
        const response = await fetch(noticesLink);
        let data = await response.json();
        data = data._embedded.notices;

        data.forEach((element: Object) => {
            criminals.push(new Criminal(element._links.self.href));
        });
    }

    onMount(async () => {
        await fetchNotices();
    });
</script>

<div class="flex flex-col items-center justify-center gap-3 p-4 text-white">
    <h1 class="text-3xl sm:text-4xl md:text-5xl text-center text-white">Criminals Registry</h1>
    <p class="text-base md:text-lg flex justify-center text-gray text-center">Browse and manage detailed records of offenders with advanced sorting and filtering options.</p>
</div>
    
<div class="flex justify-center gap-6 flex-wrap p-4">
</div>
