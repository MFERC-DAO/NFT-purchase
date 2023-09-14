<template>
  <div class="myNFT">
    <Header></Header>
    <article>
      <div class="title-cont">
        <h1>我的</h1>
        <h5>{{ account ? (account.slice(0, 4) + '...' + account.slice(-4)) : '' }}</h5>
        <div class="line"></div>
      </div>
      <div class="bee-grp-cont">
        <h3 class="sub-title">我的黑色蜜蜂</h3>
        <ul class="fx fx-wrap">
          <!-- 占位图，没有时显示 -->
          <li>
            <div class="img-def" v-show="myBlackIds.length === 0"></div>
          </li>
          <li v-for="id of myBlackIds">
            <div class="bee-cont" @click="selectedBlackId = id; showBBeePopUp=true">
              <div class="cover"></div>
              <div class="img-cont"><img :src="BlackBeeCANBaseUri + id + '.jpg'" alt=""></div>
            </div>
            <h3>#B{{ prefixInteger(id, 2) }}</h3>
          </li>
        </ul>
      </div>
      <!-- <div class="line"></div>
      <div class="bee-grp-cont">
        <h3 class="sub-title">我的紫色蜜蜂</h3>
        <ul class="fx fx-wrap">
          <li v-for="item in 2">
            <div class="bee-cont">
              <div class="cover"></div>
              <div class="img-cont"><img src="@/assets/img/bee_img.jpg" alt=""></div>
            </div>
            <h3>#P045</h3>
          </li>
        </ul>
      </div> -->
      <div class="line"></div>
      <div class="cont-g">
        <h3 class="sub-title">我的金色蜜蜂</h3>
        <ul class="fx fx-wrap">
          <!-- 占位图，没有时显示 -->
          <li>
            <div class="img-def" v-show="myGoldenIds.length === 0"></div>
          </li>
          <li v-for="item of 10">
            <div class="bee-cont" @click="selectedGoldenId=id;showGBeePopUp=true">
              <div class="cover"></div>
              <div class="img-cont"><img src="@/assets/img/bee_def.jpg" alt=""></div>
            </div>
            <h3>#G0026</h3>
          </li>
          <li v-for="id of myGoldenIds">
            <div class="bee-cont" @click="selectedGoldenId=id;showGBeePopUp=true">
              <div class="cover"></div>
              <div class="img-cont"><img :src="myGoldenUris[id]" alt=""></div>
            </div>
            <h3>#G{{ prefixInteger(id, 4) }}</h3>
          </li>
        </ul>
      </div>
    </article>
    <!-- 黑蜂 -->
    <PopUp :show.sync="showBBeePopUp" class="mint-bee-pop b-bee">
      <div class="bee-img-grp">
        <div class="logo-img-cont"></div>
        <div class="bee-img">
          <img class="img-bee" :src="BlackBeeCANBaseUri + selectedBlackId + '.jpg'" alt="">
          <!-- <img v-show="!showImg" class="img-def" src="@/assets/img/bee_def.jpg" alt=""> -->
          <div class="bee-img-bg"></div>
        </div>
        <div class="g-num silver-gradient-text"><span>B</span><i>{{ prefixInteger(selectedBlackId, 2) }}</i></div>
      </div>
      <div class="btn-close" @click="showBBeePopUp=false"></div>
    </PopUp>
    <!-- 金蜂 -->
    <PopUp :show.sync="showGBeePopUp" class="mint-bee-pop g-bee">
      <div class="bee-img-grp">
        <div class="logo-img-cont"></div>
        <div class="bee-img">
          <img class="img-bee" :src="myGoldenUris[selectedGoldenId]" alt="">
          <!-- <img v-show="!showImg" class="img-def" src="@/assets/img/bee_def.jpg" alt=""> -->
          <div class="bee-img-bg"></div>
        </div>
        <div class="g-num gold-gradient-text"><span>G</span><i>{{ prefixInteger(selectedGoldenId, 4) }}</i></div>
      </div>
      <div class="btn-close" @click="showGBeePopUp=false"></div>
    </PopUp>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PopUp from '@/components/PopUp'
import { mapState } from 'vuex'
import { getUserHolding, getGoldenBeeUrls } from '@/utils/nft'
import { ethers } from 'ethers'
import { BeeContracts, BaseUrl, BlackBeeCANBaseUri } from '@/nft-config'
import { prefixInteger } from '@/utils/helper'
import axios from 'axios'

export default {
  name: 'BeeSilver',
  components: {
    Header,
    Footer,
    PopUp
  },
  computed: {
    ...mapState('web3', ['account', 'chainId']),
    ...mapState('nft', ['blackAllownce', 'hasMintedBlack', 'blackWhitelistOk', 'mintedBlackBeeIds', 'myBlackIds', 'myGoldenIds', 'myGoldenUris']),
    ...mapState('asset', ['mfercBalance']),
  },
  data () {
  	return {
      showBBeePopUp: false,
      showGBeePopUp: false,
      BlackBeeCANBaseUri,
      selectedBlackId: 0,
      selectedGoldenId: 0
    }
  },
  watch: {
    account(newValue, oldValue) {
      this.updateInfo();
    }
  },
  methods: {
    prefixInteger,
    async updateInfo() {
      if (!ethers.utils.isAddress(this.account)) return;
        getUserHolding(this.account, 'black').then(b => {
          this.$store.commit('nft/saveMyBlackIds', b)
        }).catch();
        getUserHolding(this.account, 'golden').then(async (g) => {
          this.$store.commit('nft/saveMyGoldenIds', g);

          if (g.length > 0) {
            let uris = await getGoldenBeeUrls(g)
            const ids = Object.keys(uris)
            uris = await Promise.all(Object.values(uris).map(u => axios.get(u)))
            let goldenUris = {}
            let i = 0;
            for (let id of ids) {
              goldenUris[id] = uris[i++].data.image
            }
            this.$store.commit('nft/saveMyGoldenUris', goldenUris)
          }
        }).catch();
    }
  },
  mounted () {
    this.updateInfo()
  },
}
</script>
<style lang="scss" scoped>
	@import 'MyNFT';
</style>
