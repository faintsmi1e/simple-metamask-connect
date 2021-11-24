<script context="module">
</script>

<script lang="ts">
  import Picture from '$lib/picture.svelte';
  import Balance from '$lib/balances.svelte';
  import { userAccount, userBalance, userAuth } from '$lib/store';
</script>

<svelte:head>
  <title />
</svelte:head>

<section>
  {#if $userAuth === 'true'}
    <h2
      class="text-2xl text-center my-8 overflow-hidden w-40 overflow-ellipsis"
    >
      Wallet:{$userAccount.address}...
    </h2>
    <Balance userBalance={$userBalance} />
  {:else}
    <div class="welcome">
      <Picture />
    </div>
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .welcome {
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }
</style>
