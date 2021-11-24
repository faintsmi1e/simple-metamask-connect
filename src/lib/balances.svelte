<script>
  export let userBalance;
</script>

<div
  class="p-6 bg-gray-100 text-gray-800 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
>
  <h2>Balance:</h2>
  {#each userBalance as balance}
    {#if balance.balance}
      <p>{balance.name} , {balance.balance}</p>
    
    {/if}
  {/each}
</div>
