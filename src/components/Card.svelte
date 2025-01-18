<script lang="ts">
    export let profilePicturePath: string;
    export let name: string;
    export let description: string;
    export let link: string = '#';

    import defaultProfilePicture from '../assets/images/defaultProfilePicture.png';
</script>

<div class="max-w-sm  border  rounded-lg shadow bg-gray-800 border-gray-700 w-4/5 sm:w-64 sm:h-160">
    <div class="p-5 flex justify-center">
        <img class="rounded-t-lg w-64" src={profilePicturePath || defaultProfilePicture} alt="" />
    </div>
    <div class="p-5">
        <a href="{link}">
            <h5 class="mb-2 text-2xl text-white font-bold tracking-tighttext-white">{name}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-400">{description}</p>
        <a href="{link}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
            Read more
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
