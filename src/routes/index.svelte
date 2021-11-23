<script context="module">
</script>

<script lang="ts">
  import Picture from '$lib/picture.svelte';
  import { userAccount, userBalance, userAuth } from '$lib/store';
  
  
</script>

<svelte:head>
  <title />
</svelte:head>

<section>
  {#if $userAuth === 'true'}
    <h2>
      Your wallet: {$userAccount.address}
    </h2>
    <h2>Your balance:</h2>
    {#each $userBalance as balance}
      {#if balance.balance}
        <p>{balance.name} , {balance.balance}</p>
      {:else}
        <p>{balance.name}: 0</p>
      {/if}
    {/each}
  {:else}
 

  <h1>
    <div class="welcome">
      <Picture />
    </div>

    to your new<br />SvelteKit app
  </h1>

  <h2>
    try editing <strong>src/routes/index.svelte</strong>
  </h2>
  
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
