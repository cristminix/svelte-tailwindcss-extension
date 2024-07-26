<script lang="ts">
  import Link from "../ux/Link.svelte"
  export let options: any
  export let item
  export let index
  export let linkCls
  //   function getLinkButton(ref) {
  //     if (ref) {
  //       if (ref.current) {
  //         console.log(ref.current.getLinkButton())
  //       }
  //     }
  //   }
  const linkTo = typeof options.editUrl == "function" ? options.editUrl(item) : options.editUrl
</script>

<Link routeApp={options.routeApp} className={linkCls} to={linkTo}>
  <i class="bi bi-pencil-square"></i> Edit
</Link>
