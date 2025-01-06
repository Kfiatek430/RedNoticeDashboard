<script lang="ts">
  import { HomeSolid, GridSolid, ChartPieSolid, InfoCircleSolid } from 'flowbite-svelte-icons';
</script>

<div class="w-1/5 md:w-64 h-20 bg-gray-800 flex justify-center items-center">
<button
  data-drawer-target="default-sidebar"
  data-drawer-toggle="default-sidebar"
  aria-controls="default-sidebar"
  type="button"
  class="inline-flex items-center p-2 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
>
  <span class="sr-only">Open sidebar</span>
  <svg
    class="w-6 h-6"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clip-rule="evenodd"
      fill-rule="evenodd"
      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
    ></path>
  </svg>
</button>
</div>

<aside
  id="default-sidebar"
  class="fixed top-0 left-0 z-40 w-64 bg-gray-800 h-screen transition-transform -translate-x-full sm:translate-x-0 sm:pt-[4rem]"
  aria-label="Sidebar"
>
  <div class="h-full px-3 py-4 overflow-y-auto bg-gray-800">
    <ul class="space-y-2 font-medium">
      <li>
        <a
          href="/"
          class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
        >
          <HomeSolid class="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
          <span class="ms-3">Home</span>
        </a>
      </li>
      <li>
        <a
          href="/#/registry"
          class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
        >
          <GridSolid class="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
          <span class="flex-1 ms-3 whitespace-nowrap">Registry</span>
        </a>
      </li>
      <li>
        <a
          href="/#/statistics"
          class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
        >
          <ChartPieSolid class="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
          <span class="flex-1 ms-3 whitespace-nowrap">Statistics</span>
        </a>
      </li>
      <li>
        <a
          href="/#/about"
          class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
        >
          <InfoCircleSolid class="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
          <span class="flex-1 ms-3 whitespace-nowrap">About</span>
        </a>
      </li>
    </ul>
  </div>
</aside>
