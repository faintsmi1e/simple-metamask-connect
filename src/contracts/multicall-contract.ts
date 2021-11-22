import { ethers } from 'ethers';
import { provider } from '$lib/store';


const multicallAddress: string = '0x41263cBA59EB80dC200F3E2544eda4ed6A90E76C';
const multicallAbi: ethers.ContractInterface = [
  'function aggregate(tuple(address target, bytes callData)[] calls) public view returns (uint256 blockNumber, bytes[] memory returnData)',
];


export let MulticallContract: ethers.Contract;
try {
  provider.subscribe(provider => {
    if(provider.provider) {
      MulticallContract =  new ethers.Contract(multicallAddress, multicallAbi, provider);
    }
  })
} catch (e) {
  console.log(e)
}