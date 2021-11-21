import {   get } from 'svelte/store';
import { userTest, provider, userAuth } from '$lib/store';

export const onAccountChangeListener = (accounts: string[]) => {
  console.log('accountsChanged', accounts[0]);
      if (accounts[0] && get(userAuth)) {
        console.log('123',get(userAuth));
        userTest.setUserAddress(accounts[0]);
        userAuth.setAuth(true);
      }
}