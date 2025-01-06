<script lang="ts">
  import Router from 'svelte-spa-router'
  import Home from './routes/Home.svelte';
  import SearchBar from './components/SearchBar.svelte';
  import SideBar from './components/SideBar.svelte';

  const routes = {
    '/': Home
  }
</script>

<div class="sticky top-0 flex justify-between">
  <SideBar />
  <SearchBar />
</div>
<div class="p-4 sm:ml-64">
  <Router {routes} />
</div>