import { ethers } from 'ethers';

const USDCConctractAddress = '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d';
const USDTConctractAddress = '0x55d398326f99059fF775485246999027B3197955';
const BTCBConctractAddress = '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c';

export const ERC20TokensAddresses = [
  USDCConctractAddress,
  USDTConctractAddress,
  BTCBConctractAddress,
];
const ERC20ABI: ethers.ContractInterface = [
  'function name() external view returns (string memory)',
  'function symbol() view returns (string)',
  'function decimals() public view virtual override returns (uint8)',
  'function balanceOf(address) view returns (uint256)',
];
export const ERC20 = new ethers.utils.Interface(ERC20ABI);
