<script context="module">
  import { browser } from '$app/env';
  import { userAccount, provider, userAuth, storeReset } from '$lib/store';
  import { get } from 'svelte/store';
  import {
    onAccountChangeListener,
    onChainChangeListener,
  } from '../utils/metamaskListeners';
  import { ethers } from 'ethers';

  if (browser) {
    const ethereum = window.ethereum;
    if (ethereum) {
      const providerEth = new ethers.providers.Web3Provider(window.ethereum);
      provider.set(providerEth);

      ethereum.on('accountsChanged', onAccountChangeListener);

      ethereum.on('chainChanged', onChainChangeListener);

      get(userAuth) === 'true' &&
        userAccount.setUserAddress(ethereum.selectedAddress); 
    }
  }
</script>

<script lang="ts">
  import '../app.css';

  const connectWallet = async () => {
    try {
      const accounts = await $provider.provider.request({
        method: 'eth_requestAccounts',
      });
      const changeNet = await $provider.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }],
      });
      provider.set(new ethers.providers.Web3Provider(window.ethereum));
      userAccount.setUserAddress(accounts[0]);
      userAuth.setAuth('true');
    } catch (e) {
      storeReset();
      console.log(e);
    }
  };

  const disconnectWallet = () => {
    userAccount.setUserAddress('');
    userAuth.setAuth('false');
  };
</script>

<div class="p-8 max-w-6xl mx-auto">
  <div class="flex justify-end w-full">
    {#if $userAuth === 'false'}
      <button class="p-2 bg-pink-300 text-gray-900 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center" on:click={connectWallet}>CONNECT</button>
    {:else if $userAuth === 'true'}
      <button class="p-2 bg-pink-300 text-gray-900 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center" on:click={disconnectWallet}
        >DISCONNECT</button
      >
    {/if}
  </div>
  {#if !browser}
    <div>loading...</div>
  {:else}
    <main >
      <slot />
    </main>
  {/if}
</div>
