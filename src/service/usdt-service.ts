import { ethers } from 'ethers';
import { USDT } from '../interfaces/USDT';

const USDTAddress = '0x55d398326f99059fF775485246999027B3197955';

export default class USDTService {
  static async encodeBalanceCall(address: string) {
    return [
      {
        target: USDTAddress,
        callData: USDT.encodeFunctionData('name'),
      },
      {
        target: USDTAddress,
        callData: USDT.encodeFunctionData('symbol'),
      },
      {
        target: USDTAddress,
        callData: USDT.encodeFunctionData('balanceOf', [`${address}`]),
      },
    ] as const;
  }

  static decodeBalanceCall(array: string[]) {
    const balance: string = USDT.decodeFunctionResult(
      'balanceOf',
      array[2]
    )[0].toString();
    console.log(array);
    return [
      String(USDT.decodeFunctionResult('name', array[0])[0]),
      String(USDT.decodeFunctionResult('symbol', array[1])[0]),
      balance.slice(0, balance.length - 18),
    ];
  }
}
