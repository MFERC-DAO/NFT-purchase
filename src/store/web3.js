import Cookie from 'vue-cookies'

export default {
  namespaced: true,
  state: {
    account: Cookie.get('eth-account'),
    allAccounts: [],
    abis: {},
    blockNum: null,
    readonlyProvider: {}
  },
  mutations: {
    saveAccount: (state, account) => {
      state.account = account
      Cookie.set('eth-account', account, '30d')
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
