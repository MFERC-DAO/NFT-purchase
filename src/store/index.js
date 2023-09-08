import Vue from 'vue'
import Vuex from 'vuex'
import web3 from './web3'
import nft from './nft'
import asset from './asset'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    web3,
    nft,
    asset
  }
})
