import { USDTContract, USDTAddress } from '../contracts/usdt-contract';

export default class USDTService {
  static async encodeBalanceCall(address: string) {
    return [
      {
        target: USDTAddress,
        callData: USDTContract.interface.encodeFunctionData('name'),
      },
      {
        target: USDTAddress,
        callData: USDTContract.interface.encodeFunctionData('balanceOf', [
          `${address}`,
        ]),
      },
    ] as const;
  }
}
