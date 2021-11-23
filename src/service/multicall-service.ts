import { getMulticallContract } from '../contracts/multicall-contract';
import USDTService from './usdt-service';
import type { BigNumber } from 'ethers';
import { encode, decode } from 'hex-encode-decode';
type multicallResult = [
  BigNumber,
  string[]
]


export async function getBalances(address: string) {
  const calls = [...(await USDTService.encodeBalanceCall(address)),...(await USDTService.encodeBalanceCall(address))];
  console.log(calls);
  const multiCallResult: multicallResult = await getMulticallContract().aggregate(calls);
  console.log(multiCallResult);
  const readableRes = USDTService.decodeBalanceCall(multiCallResult[1]);
  console.log(readableRes);

  return readableRes;
}


