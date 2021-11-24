import { get } from 'svelte/store';
import { userAccount, userAuth, storeReset } from '$lib/store';

export const onAccountChangeListener = (accounts: string[]) => {
  if (accounts[0] && get(userAuth)) {
    userAccount.setUserAddress(accounts[0]);
    userAuth.setAuth('true');
  }
};

export const onChainChangeListener = (chainID: string) => {
  chainID !== '0x38' && storeReset();
};
