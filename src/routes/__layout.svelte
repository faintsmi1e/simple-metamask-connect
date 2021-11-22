<script context="module">
  import { browser } from '$app/env';
  import { userTest, provider, userAuth } from '$lib/store';
  import { get } from 'svelte/store';
  import { onAccountChangeListener } from '../utils/metamaskListeners';
  import { ethers } from 'ethers';
  import MulticallService from '../service/multicall-service';
  console.log('ghbdtn')
  if (browser) {
    const ethereum = window.ethereum;
    if (ethereum) {
      console.log('вешаем обработчики');
      const providerEth = new ethers.providers.Web3Provider(window.ethereum);
      console.log(ethereum);
      console.log('provider', providerEth);
      ethereum.on('accountsChanged', onAccountChangeListener);

      ethereum.on('chainChanged', (chainId) => {
        console.log('chainChanged', chainId);
      });

      ethereum.on('connect', (chainId) => {
        console.log('connect', chainId);
      });

      ethereum.on('disconnect', (chainId) => {
        console.log('disconnect', chainId);
      });
      provider.set(providerEth);

      if (get(userAuth) === 'true') {
        console.log('if', Boolean(get(userAuth)));
        userTest.setUserAddress(ethereum.selectedAddress);
      }
    }
  }
</script>

<script lang="ts">
  import '../app.css';
  import { onDestroy, onMount } from 'svelte';

  import { navigating } from '$app/stores';

  import { page, session } from '$app/stores';

  const onAddWalletClick = async () => {
    const accounts = await $provider.provider.request({
      method: 'eth_requestAccounts',
    });
    const changeNet = await $provider.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x38' }],
    });

    userTest.setUserAddress(accounts[0]);
    userAuth.setAuth(true);
  };

  const onDiscWalletClick = async () => {
    const permissions = await $provider.provider.request({
      method: 'wallet_requestPermissions',
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    const accounts = await $provider.provider.request({
      method: 'eth_requestAccounts',
    });
  };

  const onDiscClick = () => {
    userTest.setUserAddress('');
    userAuth.setAuth(false);
  };

  const onBalanceClick = async () => {
    
  };
  onDestroy(() => {
    console.log('убираем обработчики');
  });
</script>

<div>
  <div class="nav__menu">
    <ul class="petya list-disc list-inside">
      <li>
        <a sveltekit:prefetch href="/">Home</a>
      </li>
      <li>
        <a sveltekit:prefetch href="/about">About</a>
      </li>
      <li>
        <a sveltekit:prefetch href="/todos/aboutt">Todos</a>
      </li>
    </ul>
  </div>
  <div class="nav__buttons">
    <button on:click={onAddWalletClick}>CONNECT</button>
    <button on:click={onDiscWalletClick}>disConnect metamask </button>
    <button on:click={onDiscClick}>REAL DISC</button>
    <button on:click={onBalanceClick}>GET BALANCES</button>
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
