import { MulticallContract } from '../contracts/multicall-contract';
import USDTService from './usdt-service';
import { ethers } from 'ethers';
export default class MulticallService {
  
  static async getBalances(address: string) {
    const calls = [...await USDTService.encodeBalanceCall(address)]
    
    const multiCallResult = await MulticallContract.aggregate(calls);
    
    const utf8Strings = multiCallResult[1].map((result: string) => {
      return ethers.utils.toUtf8String(ethers.utils.hexStripZeros(result)).replace(/\0/g, '')
    })
    
    return utf8Strings;
  }
}
