<script lang="ts">
  import WheelPicker from '$lib/WheelPicker.svelte';
</script>

<main>
  <h1>Random Name Picker Wheel</h1>
  <WheelPicker />
</main>

<style lang="scss">
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  h1 {
    color: #333;
    margin-bottom: 2rem;
  }
</style>
