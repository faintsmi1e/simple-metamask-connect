import { ethers } from 'ethers';
import { provider } from '$lib/store';

import { get } from 'svelte/store';

const multicallAddress: string = '0x41263cBA59EB80dC200F3E2544eda4ed6A90E76C';
const multicallAbi: ethers.ContractInterface = [
  'function aggregate(tuple(address target, bytes callData)[] calls) public view returns (uint256 blockNumber, bytes[] memory returnData)',
];

export function getMulticallContract() {
  try {
    const providerUSDT = get(provider);
    if (providerUSDT.provider) {
      return new ethers.Contract(multicallAddress, multicallAbi, providerUSDT);
    };
  } catch (e) {
    console.log(e);
  };
};
