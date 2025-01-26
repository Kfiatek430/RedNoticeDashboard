<script lang="ts">
    export let name: string;
    export let id: string;
    export let profilePicturePath: string;
    export let dateOfBirth: string;
    export let nationalities: string[];

    name = name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    dateOfBirth = new Date(dateOfBirth).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

    let link = `/#/criminals/${id}`;

    import defaultProfilePicture from '../assets/images/defaultProfilePicture.png';
</script>

<div class="max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700 w-4/5 sm:w-64 sm:h-160 flex flex-col items-left justify-between">
    <div class="p-5 pb-2 flex justify-center flex-col items-center gap-3">
        <img class="rounded-t-lg w-64 md:w-64 md:h-64" src={profilePicturePath || defaultProfilePicture} alt="" draggable="false" />
        <a href="{link}" class="w-full">
            <h5 class="mb-2 text-2xl text-white font-bold tracking-tight">{name}</h5>
        </a>
    </div>
    
    <div class="p-5 pt-0">
        <p class="mb-3 font-normal text-gray-400">{dateOfBirth}</p>
        <div class="flex gap-3 mb-3">
        {#each nationalities as nationality}
            <img src={`https://www.flagsapi.com/${nationality}/flat/48.png`} alt="" draggable="false" />
        {/each}
        </div>
        <a href="{link}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
            Read more
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
