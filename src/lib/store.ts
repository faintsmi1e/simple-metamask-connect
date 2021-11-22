import { writable, derived } from 'svelte/store';
import { browser } from '$app/env';
import type { ethers } from 'ethers';
import MulticallService from '../service/multicall-service';
type provider = ethers.providers.Web3Provider;
type Auth = {
  subscribe: (this: void, run: any, invalidate?: any) => any;
  setAuth: (isAuth: boolean) => void;
};

export const provider = writable({} as provider);

function createAuth() {
  const { subscribe, set, update } = writable(
    localStorage.getItem('isAuth') || false
  );
  subscribe((val) => localStorage.setItem('isAuth', val.toString()));
  return {
    subscribe,

    setAuth: (isAuth: boolean) => {
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

export const userTest = createUser();

// export const userBalance = derived(userTest, ($userTest, set) => {
//   const getBalance = async () => {
//     console.log('запрашиваем баланс')
//     const [name, balance] = await MulticallService.getBalances(
//       $userTest.address
//     );
//     set([name, balance]);
//   };
  
// },['...loading','...loading']);
