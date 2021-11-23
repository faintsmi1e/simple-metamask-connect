import  { ethers } from 'ethers';

const USDTAbi: ethers.ContractInterface = [
  'function name() external view returns (string memory)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint256)',
];
export const USDT = new ethers.utils.Interface(USDTAbi);