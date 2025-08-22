<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';

  const { children } = $props();
</script>

<svelte:head>
  <link
    href={favicon}
    rel="icon"
  />
</svelte:head>

{@render children?.()}
