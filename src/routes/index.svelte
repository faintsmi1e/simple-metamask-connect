<script context="module">
</script>

<script lang="ts">
  import Picture from '$lib/picture.svelte';
  import { count, userTest, provider } from '$lib/store';
  import { onMount } from 'svelte';

  let count_value: number;
  count.subscribe((value) => {
    count_value = value;
  });
</script>

<svelte:head>
  <title>{count_value}</title>
</svelte:head>

<section>
  <h2>
    Your wallet: {$userTest.address}
  </h2>
  <h1>
    <div class="welcome">
      <Picture />
    </div>

    to your new<br />SvelteKit app
  </h1>

  <h2>
    try editing <strong>src/routes/index.svelte</strong>
  </h2>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  h1 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  button {
    background-color: #5f49ff;
    border-radius: 4px;
    border: none;
    height: 26px;
    cursor: pointer;
    color: white;

    font-family: 'Open Sans', sans-serif;

    margin-bottom: 5px;
  }

  .welcome {
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>
