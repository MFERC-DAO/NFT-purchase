<template>
  <div class="home">
    <Header></Header>
    <article>
      <section class="cont">
       <div class="bee-cont fx-align">
         <video autoplay muted loop playsinline id="video"><source src="@/assets/video/vdieo_01.mp4" type="video/mp4"></video>
         <div class="video-bg" v-show="!loaded"></div>
       </div>
       <!-- mint板块,写倒计时时，隐藏了，去掉class即可显示 -->
        <div>
          <button class="btn-mint fx-align" @click="showMintPopUp=true">
            <div class="mint-text">
              <p>1,000,000 $Mferc</p>
              <div class="fx-align">
                <h5>MINT</h5>
              </div>
            </div>
          </button>
          <div class="num-cont fx-align gold-gradient-text">
            <span class="f-b">{{ totalSupply }}</span>/6666
          </div>
          <div class="fx-align gold-gradient-text">
            <p>
              当前剩余{{ pendingGolden }}可mint
            </p>
          </div>
          <div class="tips fx-align"><i class="icon-i"></i><span @click="showExplainPopUp=true">金蜂NFT说明书</span></div>
        </div>
      </section>
    </article>
    <!-- mint弹层 -->
    <PopUp :show.sync="showMintPopUp" class="mint-pop">
      <div class="mint-pop-img"></div>
      <h3>
        <p>每一次MINT就像拆开一个盲盒</p>
        <p>给你一份惊喜！</p>
      </h3>
      <button class="btn-mint btn-popup fx-align" :class="(state === 2 || state === 3) ? 'disable' : ''"
        :disabled="minting || state === 2 || state === 3"
         @click="mint">
        <div class="mint-text">
          <p>1,000,000 $Mferc</p>
          <div class="fx-align">
            <div class="btn-loading" v-show="minting"></div>
            <h6>{{ mintBtn }}</h6>
          </div>
        </div>
      </button>
      <p v-show="state===2" class="c-r text-center">
        您的余额不足
      </p>
      <p v-show="state===3" class="c-r text-center">
        当前没有金色蜜蜂可以mint
      </p>
      <div class="btn-close" @click="showMintPopUp=false"></div>
    </PopUp>
    <!-- mint弹层 -->
    <PopUp :show.sync="showBeePopUp" class="mint-bee-pop">
      <div class="bee-img-grp">
        <!-- <div class="light-img"></div> -->
        <div class="logo-img-cont"></div>
        <div class="bee-img">
          <img :src="mintedNftUri" alt="">
          <div class="bee-img-bg"></div>
        </div>
        <div class="g-num gold-gradient-text"><span>G</span><i>{{ prefixInteger(mintedId, 4) }}</i></div>
      </div>
      <h3>恭喜！您获得了#G{{ prefixInteger(mintedId, 4) }}金蜂</h3>
      <div class="btn-close" @click="showBeePopUp=false"></div>
    </PopUp>
    <!-- 说明弹层 -->
    <PopUp :show.sync="showExplainPopUp" class="ex-pop">
      <div class="ex-bg">
        <h2>
          <p>金色蜜蜂</p>
          <p>代表社区共识者</p>
        </h2>
        <div class="info-cont">
          <h3>数量：限量6666个，分批次发放</h3>
          <h3>本批次剩余：{{ pendingGolden }}个</h3>
          <h3>售价：1.000,000 $Mferc (直接销毀）</h3>
          <dl>
            <dt>持有者权益：</dt>
            <dd class="fx"><i class="fx-shrink"></i>收获社区空投福利</dd>
            <dd class="fx"><i class="fx-shrink"></i>可增加wormhole3平台莫比社区的Credit值，提高挖矿效率</dd>
            <dd class="fx"><i class="fx-shrink"></i>可以通过交易NFT获得收益</dd>
            <dd class="fx"><i class="fx-shrink"></i>更多惊喜待后续解锁</dd>
          </dl>
        </div>
        <div class="btn-close" @click="showExplainPopUp=false"></div>
      </div>
    </PopUp>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PopUp from '@/components/PopUp'
import { getTotalSupply, getPendingGoldenBeeCount, mintGoldenBee } from '@/utils/nft'
import { approve, getApprovement } from '@/utils/asset'
import { mapState } from 'vuex'
import { Arbitrum, MFERC } from '@/config'
import { BaseUrl, BeeContracts } from '@/nft-config'
import { ethers } from 'ethers'
import { setupNetwork } from '@/utils/web3'
import axios from 'axios'
import { prefixInteger } from '@/utils/helper'

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    PopUp
  },
  data () {
  	return {
      loaded: false,
      showMintPopUp: false,
      showBeePopUp: false,
      showExplainPopUp: false,
      totalSupply: 0,
      connecting: false,
      minting: false,
      mintedNftUri: '',
      mintedId: 0,
      mintBtn: '',
      beeVideo: null
    }
  },
  computed: {
    ...mapState('web3', ['account', 'chainId']),
    ...mapState('nft', ['pendingGolden', 'goldenAllownce']),
    ...mapState('asset', ['mfercBalance']),
    state() {
      if (this.chainId != Arbitrum.id) {
        this.mintBtn = 'Connect'
        return 1  // wrong chain
      }
      if (this.mfercBalance < 1000000) {
        this.mintBtn = 'Mint'
        return 2 // insufficient balance
      }
      if (this.pendingGolden < 1) {
        this.mintBtn = 'Mint'
        return 3 // no more to mint
      }
      if (this.goldenAllownce < 1000000) {
        this.mintBtn = 'Approve'
        return 4 // need approve
      }
      this.mintBtn = 'Mint'
      return 5 // can mint
    }
  },
  watch: {
    account(newValue, oldValue) {
      if (ethers.utils.isAddress(newValue)) {
        this.updateUserData();
      }
    }
  },
  methods: {
    prefixInteger,
    async connect() {
      try{
        this.connecting = true
        await setupNetwork();
      } catch (e) {

      } finally {
        this.connecting = false
      }
    },
    async updateUserData() {
      if (!ethers.utils.isAddress(this.account)) return;
      // get approve
      getApprovement(this.account, MFERC, BeeContracts.golden).then(res => {
        this.$store.commit('nft/saveGoldenAllownce', res)
      }).catch()
      // getPendingGoldenBeeCount
      getPendingGoldenBeeCount().then(res => {
        if (res > 0) {
          this.$store.commit('nft/savePendingGolden', res)
        }
      }).catch()
      // get total supply
      getTotalSupply('golden')
      .then(supply => {
        this.totalSupply = supply
      })
      .catch();
    },
    async mint() {
      try{
        if (this.minting) return;
        this.minting = true
        switch(this.state) {
          case 1:
            this.connect()
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            await approve(this.account, MFERC, BeeContracts.golden)
            await this.updateUserData();
            break;
          case 5:
            const mintedNft = await mintGoldenBee()
            const json = await axios.get(BaseUrl.golden + mintedNft.uri);
            console.log(42, json)
            this.mintedId = mintedNft.tokenId;
            this.mintedNftUri = json.data.image
            this.updateUserData()
            this.showMintPopUp = false
            this.showBeePopUp = true;
            break;
        }
      } catch(e) {
        console.log('mint error:', e)
        this.$store.commit('setAlert', {
          title: "交易失败",
          content: e
        });
      } finally {
        this.minting = false
      }

    }
  },
  mounted () {
    this.updateUserData()
    this.beeVideo = document.getElementById('video');
    this.beeVideo.ondurationchange= () => {
      this.loaded = true
    }
  },
}
</script>
<style lang="scss" scoped>
	@import 'Home';
</style>
