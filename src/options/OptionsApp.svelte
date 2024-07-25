<script lang="ts">
  import "tailwindcss/tailwind.css"
  import "@fortawesome/fontawesome-free/css/all.min.css"
  import "bootstrap-icons/font/bootstrap-icons.css"

  import About from "./components/About.svelte"
  import NotFound from "./components/NotFound.svelte"
  import Contact from "./components/Contact.svelte"
  import RoutesApp from "./components/RoutesApp.svelte"
  import Link from "./components/ux/Link.svelte"
  import { writable } from "svelte/store"
  import Template from "./components/ux/Template.svelte"

  let routeApp: any
  let queryString = writable<string | null>(null)

  interface RoutingMap {
    [key: string]: any
  }
  const routingMap: RoutingMap = {
    "/about": About,
    "/contact": Contact,
  }

  let page: any
  function onRouteChange(path: string, _queryString: string | null) {
    page = routingMap[path] || NotFound
    queryString.update((o) => _queryString)
  }
</script>

<!-- 
<nav>
  <Link {routeApp} to="/about" isActive={page === About}>About</Link> &nbsp; &nbsp;
  <Link {routeApp} to="/contact" isActive={page === Contact}>Contact Us</Link>
</nav> -->

<Template {routeApp}>
  <RoutesApp bind:this={routeApp} {onRouteChange} />
  <svelte:component this={page} {queryString} />
</Template>
