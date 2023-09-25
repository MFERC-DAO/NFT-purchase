
export default {
  namespaced: true,
  state: {
    blacks: [],
    goldens: [],
    purples: [],
    totalBurned: 0,
    pendingGolden: 0,
    goldenAllownce: 0,
    blackAllownce: 0,
    blackWhitelistOk: false,
    hasMintedBlack: false,
    mintedBlackBeeIds: [],
    myBlackIds: [],
    myGoldenIds: [],
    myGoldenUris: {}
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
    },
    saveGoldenAllownce: (state,  goldenAllownce) => {
      state.goldenAllownce = goldenAllownce
    },
    saveBlackAllownce: (state,  blackAllownce) => {
      state.blackAllownce = blackAllownce
    },
    saveBlackWhitelistOk: (state, blackWhitelistOk) => {
      state.blackWhitelistOk = blackWhitelistOk
    },
    saveHasMintedBlack: (state, hasMintedBlack) => {
      state.hasMintedBlack = hasMintedBlack
    },
    saveMintedBlackBeeIds: (state, mintedBlackBeeIds) => {
      state.mintedBlackBeeIds = mintedBlackBeeIds
    },
    saveMyBlackIds: (state, myBlackIds) => {
      state.myBlackIds = myBlackIds
    },
    saveMyGoldenIds: (state, myGoldenIds) => {
      state.myGoldenIds = myGoldenIds
    },
     saveMyGoldenUris: (state, myGoldenUris) => {
      state.myGoldenUris = myGoldenUris
     }
  }
}