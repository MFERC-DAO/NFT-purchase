import { getEthWeb } from './web3.js'
import store from '@/store'
import { ethers } from 'ethers'
import { CHAIN_ID } from '@/config.js'

/**
 * Get metamask accounts
 * @returns all accounts
 */
export const getAccounts = async (update = false) => {
  const metamask = await getEthWeb()
  const unlock = await metamask._metamask.isUnlocked()
  if (!unlock) {
    store.commit('web3/saveAccount', null)
    return
  }

  if (parseInt(store.state.web3.chainId !== parseInt(CHAIN_ID))) {
    store.commit('web3/saveAccount', null)
    return
  }
  if (store.state.web3.account && !update) {
    return store.state.web3.account
  }
  const accounts = await metamask.request({ method: 'eth_requestAccounts' })
  let account = accounts[0]
  account = ethers.utils.getAddress(account)
  store.commit('web3/saveAccount', account)
  return accounts[0]
}

/**
 * Monitor BSC account change event
 */
export const accountChanged = async (refresh) => {
  const metamask = await getEthWeb()
  metamask?.on('accountsChanged', (accounts) => {
    store.commit('web3/saveAccount', ethers.utils.getAddress(accounts[0]))
    if (refresh) { refresh(accounts[0]) }
  })
}
