<script lang="ts">
    import { onMount } from "svelte";
    import Card from "../components/Card.svelte";

    const noticesLink = "https://ws-public.interpol.int/notices/v1/red?&resultPerPage=50&page=1";
    let notices: BasicNotice[] = [];

    interface BasicNotice {
        date_of_birth: string;
        entity_id: string;
        forename: string;
        name: string;
        nationalities: string[];
        _links: {
            images: {
                href: string;
            };
            self: {
                href: string;
            };
            thumbnail: {
                href: string;
            };
        };
    }

    async function fetchNotices() {
        const response = await fetch(noticesLink);
        const data = await response.json();
        notices = data._embedded.notices;
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
<div class="flex justify-center gap-6 flex-wrap p-4">
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
