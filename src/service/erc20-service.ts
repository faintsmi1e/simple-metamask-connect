/// <reference types="svelte" />
import { ERC20 } from '../interfaces/ERC20';



export default class ERC20Service {
  static encodeBalanceCall(address: string, erc20ConctractAdress: string) {
    return [
      {
        target: erc20ConctractAdress,
        callData: ERC20.encodeFunctionData('name'),
      },
      {
        target: erc20ConctractAdress,
        callData: ERC20.encodeFunctionData('symbol'),
      },
      {
        target: erc20ConctractAdress,
        callData: ERC20.encodeFunctionData('decimals'),
      },
      {
        target: erc20ConctractAdress,
        callData: ERC20.encodeFunctionData('balanceOf', [`${address}`]),
      },
    ] as const;
  }

  static decodeBalanceCall(array: string[]) {
    const name = String(ERC20.decodeFunctionResult('name', array[0])[0]);
    const symbol = String(ERC20.decodeFunctionResult('symbol', array[1])[0]);
    const decimals = String(ERC20.decodeFunctionResult('decimals', array[2])[0]);
    const balance: string = ERC20.decodeFunctionResult(
      'balanceOf',
      array[3]
    )[0].toString();
    console.log(array);
    return {
      name,
      symbol,
      balance:balance.slice(0, balance.length - Number(decimals)),
    };
  }
}