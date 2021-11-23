import { get } from 'svelte/store';
import { userAccount, userAuth, storeReload } from '$lib/store';

export const onAccountChangeListener = (accounts: string[]) => {
  console.log('accountsChanged', accounts[0]);
  if (accounts[0] && get(userAuth)) {
    console.log('123', get(userAuth));
    userAccount.setUserAddress(accounts[0]);
    userAuth.setAuth('true');
  }
};

export const onChainChangeListener = (chainID) => {
  console.log('chainChanged', chainID);
  chainID !== '0x38' && storeReload();
};
