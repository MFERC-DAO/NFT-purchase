
export default {
  namespaced: true,
  state: {
    blacks: [],
    goldens: [],
    purples: [],
    totalBurned: 0,
    pendingGolden: 0
  },
  mutations: {
    saveBlacks: (state, blacks) => {
        state.blacks = blacks
    },
    saveGolden: (state, goldens) => {
        state.goldens = goldens
    },
    savePurples: (state, purples) => {
        state.purples = purples
    },
    saveTotalBurned: (state, totalBurned) => {
        state.totalBurned = totalBurned
    },
    savePendingGolden: (state, pendingGolden) => {
        state.pendingGolden = pendingGolden
    }
  }
}