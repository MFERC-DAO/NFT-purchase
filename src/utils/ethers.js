import { ethers } from 'ethers'
import Arbitrum from '@/config'
import { sleep } from '@/utils/helper'

export const getReadOnlyProvider = () => {
    // if (store.state.ethers && Object.keys(store.state.ethers).length > 0) {
    //     return store.state.ethers
    // }
    const provider = new ethers.providers.JsonRpcProvider(Arbitrum.rpc)
    // store.commit('saveEthers', provider)
    return provider
}

/**
 * Wait for the transaction comfirmed
 * @param {*} hash 
 */
 export const waitForTx = async (provider, hash) => {
  return new Promise(async (resolve, reject) => {
      try{
          console.log(`Waiting for tx: ${hash}...`)
          let trx = await provider.getTransactionReceipt(hash)
          while (!trx) {
              await sleep(1)
              trx = await provider.getTransactionReceipt(hash)
          }
          if (trx.status !== 0) {
            console.log('tx passed');
              resolve()
          }else{
              console.log('tx fail status:', trx.status);
              console.log('tx fail status:', trx);
              reject(errCode.TRANSACTION_FAIL)
          }
      }catch(err) {
          console.log('tx fail:', err);
          reject(errCode.TRANSACTION_FAIL)
      }
  })
}
