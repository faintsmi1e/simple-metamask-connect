<script lang="ts">
  import { userAccount } from '$lib/store';
</script>

<svelte:head>
  <title>Test page</title>
</svelte:head>

<section>
  <h2>
    Your test wallet: {$userAccount.address}
  </h2>
  <h1>
    <div class="welcome" />

    to your new<br />SvelteKit app
  </h1>

  <h2>
    try editing <strong>src/routes/index.svelte</strong>
  </h2>
</section>
