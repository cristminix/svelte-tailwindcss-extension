<script lang="ts">
  export let hasChildren: boolean
</script>

<span class={hasChildren ? "course-checker" : "course-checker-last"}>
  <slot></slot>
</span>

<style>
  .course-checker {
    /* Your styles for course-checker */
  }

  .course-checker-last {
    /* Your styles for course-checker-last */
  }
</style>
