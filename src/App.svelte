<script lang="ts">
  import Router from 'svelte-spa-router'
  import Home from './routes/Home.svelte';
  import SearchBar from './components/SearchBar.svelte';
  import SideBar from './components/SideBar.svelte';

  const routes = {
    '/': Home
  }
</script>

<SearchBar />
<SideBar />
<div class="mt- p-4 sm:ml-64">
  <Router {routes} />
</div>