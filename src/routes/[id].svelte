<script lang="ts">
    import { onMount } from "svelte";
    import defaultProfilePicture from '../assets/images/defaultProfilePicture.png';
    import type { ExtendedNotice } from "../types/ExtendedNotice";

    export let params: { id: string } = { id: '' };
    $: id = params.id;

    class Criminal {
        public name: string;
        public forename: string;
        public dateOfBirth: string;
        public nationalities: string[];
        public profilePicturePath: string;
        public externalLink: string;

        public placeOfBirth: string | null;
        public countryOfBirthId: string | null;

        public sex: string | null;
        public weight: number | null;
        public height: number | null;
        public eyesColorsId: string | null;
        public hairsId: string | null;

        public distinguishingMarks: string | null;

        public languagesSpokenIds: string[] | null;

        public arrestWarrants: {
            charge: string;
            issuingCountryId: string | null;
            chargeTranslation: string | null;
        }[];

        constructor(href: string) {
            this.name = "Unknown";
            this.forename = "Unknown";
            this.dateOfBirth = "Unknown";
            this.nationalities = [];
            this.profilePicturePath = "";
            this.externalLink = href;

            this.placeOfBirth = null;
            this.countryOfBirthId = null;

            this.sex = null;
            this.weight = null;
            this.height = null;
            this.hairsId = null;
            this.eyesColorsId = null;

            this.distinguishingMarks = null;

            this.languagesSpokenIds = [];

            this.arrestWarrants = [];
        }

        async run() {
            await this.fetchCriminalData(this.externalLink);
        }

        async fetchCriminalData(href: string) {
            const response = await fetch(href);
            let data: ExtendedNotice = await response.json();

            if(this.name) {
                this.name = data.name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
            }

            if(this.forename) {
                this.forename = data.forename.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
            }

            this.dateOfBirth = new Date(data.date_of_birth).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
            this.nationalities = data.nationalities;
            this.profilePicturePath = data._links.thumbnail.href;

            if(this.placeOfBirth) {
                this.placeOfBirth = data.place_of_birth!.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
            }

            this.countryOfBirthId = data.country_of_birth_id;

            if(data.sex_id === 'M') {
                this.sex = 'Male';
            } else {
                this.sex = 'Female';
            }

            this.weight = data.weight;
            this.height = data.height;
            this.hairsId = data.hairs_id;
            this.eyesColorsId = data.eyes_colors_id;

            this.distinguishingMarks = data.distinguishing_marks;

            this.languagesSpokenIds = data.languages_spoken_ids;

            this.arrestWarrants = data.arrest_warrants.map(warrant => ({
                charge: warrant.charge.split(' ').map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase()).join(' '),
                issuingCountryId: warrant.issuing_country_id,
                chargeTranslation: warrant.charge_translation
            }));
        }
    }

    let criminal: Criminal;
    let dataFetched = false;

    onMount(async () => {
        criminal = new Criminal(`https://ws-public.interpol.int/notices/v1/red/${id}`);
        await criminal.run();
        dataFetched = true;

        console.log(criminal);
    });
</script>

<div class="w-full">
    {#if dataFetched}
    <h1 class="text-3xl sm:text-4xl md:text-5xl text-center text-white mb-5">{criminal.name + " " + criminal.forename}</h1>
        <div class="flex flex-col md:flex-row items-start justify-center gap-5 p-4 text-white w-full">
            <aside class="w-full md:w-1/3 flex flex-col gap-2 p-4 font-bold">
                <img class="rounded-lg w-full md:w-64" src={criminal.profilePicturePath || defaultProfilePicture} alt="" draggable="false" />
                <div class="flex items-center gap-3">
                    <p>Nationalities:</p>
                    {#each criminal.nationalities as nationality}
                        <img src={`https://www.flagsapi.com/${nationality}/flat/24.png`} alt="" draggable="false" />
                    {/each}
                </div>
            
                {#if criminal.countryOfBirthId}
                <div class="flex items-center gap-3">
                    <p>Country of birth:</p>
                    <img src={`https://www.flagsapi.com/${criminal.countryOfBirthId}/flat/24.png`} alt="" draggable="false" />
                </div>
                {/if}

                <p>Date of birth: <span class="font-normal">{criminal.dateOfBirth}</span></p>

                {#if criminal.placeOfBirth}
                    <p>Place of birth: <span class="font-normal">{criminal.placeOfBirth}</span></p>
                {/if}
                
                {#if criminal.sex}
                    <p>Sex: <span class="font-normal">{criminal.sex}</span></p>
                {/if}
                
                {#if criminal.height}
                    <p>Height: <span class="font-normal">{criminal.height} cm</span></p>
                {/if}
                
                {#if criminal.weight}
                    <p>Weight: <span class="font-normal">{criminal.weight} kg</span></p>
                {/if}

                {#if criminal.eyesColorsId}
                    <p>Eyes: <span class="font-normal">{criminal.eyesColorsId}</span></p>
                {/if}
                
                {#if criminal.hairsId}
                    <p>Hairs: <span class="font-normal">{criminal.hairsId}</span></p>
                {/if}
            </aside>
            <div class="w-full md:w-2/3 h-full flex flex-col gap-2 justify-start p-4">
                <h2 class="font-bold text-xl">Arrest warrants:</h2>
                <ul>
                    {#each criminal.arrestWarrants as warrant}
                        <li>
                            {warrant.charge}
                        </li>
                    {/each}
                </ul>

                {#if criminal.distinguishingMarks}
                    <h2 class="font-bold text-xl mt-3">Distinguishing marks:</h2>
                    <p>{criminal.distinguishingMarks}</p>
                {/if}
            </div>
        </div>
    {/if}
</div>