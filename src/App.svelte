<script lang="ts">
  import Router from 'svelte-spa-router'
  import Home from './routes/Home.svelte';
  import SearchBar from './components/SearchBar.svelte';
  import SideBar from './components/SideBar.svelte';
  import Registry from './routes/Registry.svelte';
  import Statistics from './routes/Statistics.svelte';
  import About from './routes/About.svelte';
  import Footer from './components/Footer.svelte';
  import Id from './routes/[id].svelte';

  const routes = {
    '/': Home,
    '/registry': Registry,
    '/statistics': Statistics,
    '/about': About,
    '/criminals/:id': Id
  }
</script>

<div class="sticky top-0 flex justify-between">
  <SideBar />
  <SearchBar />
</div>
<div class="p-4 sm:ml-64 min-h-[calc(100vh-5rem)] flex flex-col justify-between items-center">
  <Router {routes} />
  <Footer />
</div>
