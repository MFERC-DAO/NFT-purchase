import {
  sleep
} from './helper'
import {
  Arbitrum
} from '@/config'
import store from '@/store'
import { ethers } from 'ethers'

/**
 * Add bsc to metamask
 * @returns
 */
export const setupNetwork = async () => {
  const { id, rpc, scan, main, chainName } = Arbitrum
  await connectMetamask()
  const eth = await getEthWeb()
  try {
    await eth.request({
      method: 'wallet_switchEthereumChain',
      params: [{
        chainId: `0x${id.toString(16)}`
      }]
    })
    store.commit('web3/saveChainId', parseInt(id))
    return true
  } catch (error) {
    console.log('connect fail1:', error)
    if (error.code === 4001) return
    if (error.code === -32002) return
    try {
      await eth.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${id.toString(16)}`,
          chainName,
          rpcUrls: [rpc],
          nativeCurrency: main,
          blockExplorerUrls: [scan]
        }]
      })
      store.commit('web3/saveChainId', parseInt(id))
      return true
    } catch (error) {
      console.log('connect wallet fail', error)
      store.commit('web3/saveAccount', null)
      return false
    }
  }
}

export const signMessage = async (message, address) => {
  const metamask = await getEthWeb()
  const provider = new ethers.providers.Web3Provider(metamask)
  const signer = provider.getSigner()
  if (await signer.getAddress() === address) {
    return await signer.signMessage(message)
  }
}

/**
 * Get metamask eth
 */
export const getEthWeb = async () => {
  if (typeof window.ethereum !== 'undefined') {
    if (!window.ethereum.isMetaMask) {
      console.log('Not metamask wallet')
    }
    if (window.ethereum.overrideIsMetaMask) {
      return window.ethereum.selectedProvider ?? window.ethereum.providers.find(p => p.isMetaMask)
    }
    return window.ethereum
  }
  const metamask = window.ethereum
  for (let i = 0; i < 10; i++) {
    if (typeof window.ethereum !== 'undefined') {
      if (window.ethereum.overrideIsMetaMask) {
        return window.ethereum.selectedProvider ?? window.ethereum.providers.find(p => p.isMetaMask)
      }
      return window.ethereum
    }
    await sleep(0.5)
  }

  return metamask
}

/**
 * Connect to Metamask
 */
export const connectMetamask = async () => {
  const metamask = await getEthWeb()
  const accounts = await metamask.request({
    method: 'eth_requestAccounts'
  })
  return accounts
}

/**
 * User changed chain
 */
export const chainChanged = async (refresh) => {
  const metamask = await getEthWeb()
  metamask.on('chainChanged', async (chainId) => {
    console.log('Changed to new chain', parseInt(chainId))
    store.commit('web3/saveChainId', parseInt(chainId))
    if (refresh) { refresh() }
  })
}


export const getBlockNum = async (chainId) => {
  const rpc = Arbitrum.rpc
  if (rpc) {
    const provider = new ethers.providers.JsonRpcProvider(rpc)
    const blockNumber = await provider.getBlockNumber()
    store.commit('community/saveCurrentBlockNum', blockNumber)
  }
}
