import {  writable  } from 'svelte/store';
import { browser } from '$app/env';

export const count = writable(0);

export const provider = writable({} as any);

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
// derived сделать от userAdress? true: false;
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

type Auth = {
  subscribe: (this: void, run: any, invalidate?:any) => any;
  setAuth: (isAuth: boolean) => void;
  
};
export let userAuth: Auth;

if (browser) {
  userAuth = createAuth();
}

export const userTest = createUser();
