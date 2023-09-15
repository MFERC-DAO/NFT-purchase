import Vue from 'vue'
import Vuex from 'vuex'
import web3 from './web3'
import nft from './nft'
import asset from './asset'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showAlertPop: false,
    alertTitle: '',
    alertContent: ''
  },
  getters: {
  },
  mutations: {
    setAlert: (state, alert) => {
      state.showAlertPop = true;
      state.alertTitle = alert.title;
      state.alertContent = alert.content;
    },
    closeAlert: (state) => {
      state.showAlertPop = false;
    }
  },
  actions: {
  },
  modules: {
    web3,
    nft,
    asset
  }
})
