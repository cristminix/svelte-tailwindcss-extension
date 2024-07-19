<script lang="ts">
  import svelteLogo from "./assets/svelte.svg"
  import viteLogo from "/vite.svg"
  import Counter from "./lib/Counter.svelte"

  const handleClick = (e: Event) => {
    console.log(e.target)
  }
</script>

<div class="App flex flex-col gap-4 h-screen items-center justify-center">
  <div class="text-5xl font-extrabold">
    <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"> This is My First Browser Extensions! </span>
  </div>
  <div class="text-2xl text-gray-800">Powered by Vite, Svelte, TypeScript, and TailwindCSS</div>
  <button
    class="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
    on:click={handleClick}>Click me!</button
  >
</div>
