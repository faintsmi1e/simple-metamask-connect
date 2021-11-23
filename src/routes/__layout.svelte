<script context="module">
  import { browser } from '$app/env';
  import { userAccount, provider, userAuth, storeReload } from '$lib/store';
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
    };
  };
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
      storeReload();
      console.log(e);
    };
  };

  const disconnectWallet = () => {
    userAccount.setUserAddress('');
    userAuth.setAuth('false');
  };
</script>

<div>
  <div class="nav__buttons">
    {#if $userAuth === 'false'}
      <button on:click={connectWallet}>CONNECT</button>
    {:else if $userAuth === 'true'}
      <button on:click={disconnectWallet}>DISCONNECT</button>
    {/if}
  </div>
</div>
{#if !browser}
  <div>загрузка...</div>
{:else}
  <main>
    <slot />
  </main>
{/if}

<footer>
  <p>
    visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
  </p>
</footer>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
  }

  footer a {
    font-weight: bold;
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
    margin-right: 10px;

    padding: 5px 5px;

    box-sizing: content-box;

    text-align: center;
  }

  div {
    display: flex;
  }
  .nav__menu {
    display: flex;
  }
  .nav__buttons {
    margin-left: auto;
  }

  @media (min-width: 480px) {
    footer {
      padding: 40px 0;
    }
  }
</style>
