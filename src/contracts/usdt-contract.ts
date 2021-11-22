import { ethers } from 'ethers';
import { provider } from '$lib/store';



export const USDTAddress = '0x55d398326f99059fF775485246999027B3197955';
const USDTAbi = [
  'function name() external view returns (string memory)',
  'function balanceOf(address account) external view returns (uint256)',
];

// let USDTprovider;
// provider.subscribe((prov) => (USDTprovider = prov));

// console.log(USDTprovider);
export let USDTContract: ethers.Contract;
try {
  provider.subscribe(provider => {
    if(provider.provider) {
      USDTContract =  new ethers.Contract(USDTAddress, USDTAbi, provider);
    }
  })
} catch (e) {
  console.log(e)
}


