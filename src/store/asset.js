
export default {
    namespaced: true,
    state: {
      mfercBalance: 0
    },
    mutations: {
      saveMfercBalance: (state, mfercBalance) => {
          state.mfercBalance = mfercBalance
      },
    }
  }