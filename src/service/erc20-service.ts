/// <reference types="svelte" />
import { ERC20 } from '../interfaces/ERC20';
import { ethers } from 'ethers';
export default class ERC20Service {
  static encodeBalanceCall(address: string, erc20ConctractAddress: string) {
    return [
      {
        target: erc20ConctractAddress,
        callData: ERC20.encodeFunctionData('name'),
      },
      {
        target: erc20ConctractAddress,
        callData: ERC20.encodeFunctionData('symbol'),
      },
      {
        target: erc20ConctractAddress,
        callData: ERC20.encodeFunctionData('decimals'),
      },
      {
        target: erc20ConctractAddress,
        callData: ERC20.encodeFunctionData('balanceOf', [`${address}`]),
      },
    ] as const;
  };

  static decodeBalanceCall(array: string[]) {
    
    const name = String(ERC20.decodeFunctionResult('name', array[0])[0]);
    const symbol = String(ERC20.decodeFunctionResult('symbol', array[1])[0]);
    const decimals = String(
      ERC20.decodeFunctionResult('decimals', array[2])[0]
    );
    console.log(decimals);
    const balance: string = ethers.utils.formatUnits(ERC20.decodeFunctionResult(
      'balanceOf',
      array[3]
    )[0].toString(), decimals);
    return {
      name,
      symbol,
      balance: Number(balance).toFixed(2),
    };
  };
};
