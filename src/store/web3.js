
export default {
  namespaced: true,
  state: {
    account: '',
    chainId: 0,
    allAccounts: [],
    abis: {},
    blockNum: null,
    readonlyProvider: {}
  },
  mutations: {
    saveAccount: (state, account) => {
      state.account = account
    },
    saveChainId: (state, chainId) => {
      state.chainId = chainId
    },
    saveAllAccounts: (state, allAccounts) => {
      state.allAccounts = allAccounts
    },
    saveAbi: (state, { name, abi }) => {
      state.abis[name] = abi
    },
    saveBlockNum: (state, blockNum) => {
      state.blockNum = blockNum
    },
    saveReadonlyProvider: (state, readonlyProvider) => {
      state.readonlyProvider = readonlyProvider
    }
  }
}
