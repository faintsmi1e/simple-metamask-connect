import { writable, derived} from 'svelte/store';
import { browser } from '$app/env';

import { getBalances } from '../service/multicall-service';

import type {Readable} from 'svelte/store';
import type { ethers } from 'ethers';

type provider = ethers.providers.Web3Provider;
type Auth = {
  subscribe: (this: void, run: any, invalidate?: any) => any;
  setAuth: (isAuth: string) => void;
};

export const provider = writable({} as provider);

function createAuth() {
  const { subscribe, set, update } = writable(
    localStorage.getItem('isAuth') || false
  );

  subscribe((val) => localStorage.setItem('isAuth', val.toString()));
  return {
    subscribe,

    setAuth: (isAuth: string) => {
      console.log('set auth');
      set(isAuth);
    },
  };
}

function createUser() {
  const { subscribe, set, update } = writable({ address: '' });

  return {
    subscribe,
    increment: () => {},

    setUserAddress: (address: string) => {
      console.log('set adress');
      update((user) => {
        user.address = address;
        return user;
      });
    },
  };
}

export let userAuth: Auth;

if (browser) {
  userAuth = createAuth();
}

export const userAccount = createUser();

export const userBalance: Readable<any[]> = derived(
  userAccount,
  ($userAccount, set) => {
    
    const fetchBalances = async () => {
      console.log('setBalance');
      const multicallResult = await getBalances($userAccount.address);
      console.log('response', multicallResult);
      set(multicallResult);
    };
    $userAccount.address ? fetchBalances() : set([]);
  },[]
);

export const storeReload = () => {
  userAccount.setUserAddress('');
  userAuth.setAuth('false');
};
