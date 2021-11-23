import { getMulticallContract } from '../contracts/multicall-contract';
import ERC20Service from './erc20-service';
import type { BigNumber } from 'ethers';
import { ERC20TokensAddresses } from '../interfaces/ERC20';

type multicallResult = [BigNumber, string[]];

export async function getBalances(address: string) {
  const multiCallContract = getMulticallContract();
  
  const callsArray = ERC20TokensAddresses.map((tokenAddress) => {
    return ERC20Service.encodeBalanceCall(address, tokenAddress);
  });

  const multiCallResults: multicallResult[] = await Promise.all(
    callsArray.map((calls) => {
      return multiCallContract.aggregate(calls);
    })
  );
  
  const readableRes = multiCallResults.map(result => {
    return ERC20Service.decodeBalanceCall(result[1])
  })

  return readableRes;
}
