<template>
  <div class="beeSilver">
    <Header></Header>
    <article>
      <section class="cont">
       <div class="bee-cont">
        <ul class="fx fx-wrap">
          <!-- 已经售出添加class：sold-out -->
          <li v-for="item in 66" @click="selectedId = item;showImg=false;showBeePopUp = true" :class="nftBeenMinted(item) ? 'sold-out' : ''">
            <div class="cover"></div>
            <div class="img-cont"><img :src="BlackBeeCANBaseUri + item + '.jpg'" alt=""></div>
          </li>
        </ul>
       </div>
        <div class="info-cont">
          <div class="choose-tips">选择你喜欢的黑蜂</div>
          <div class="num-cont fx-align gold-gradient-text"><span>{{ prefixInteger(totalSupply, 2) }}</span>/66</div>
          <div class="tips fx-align" @click="showExplainPopUp=true"><i class="icon-i"></i><span>黑蜂NFT说明书</span></div>
        </div>
      </section>
    </article>
    <!-- mint弹层 -->
    <PopUp :show.sync="showBeePopUp" class="mint-bee-pop">
      <div class="bee-img-grp">
        <!-- <div class="light-img"></div> -->
        <div class="logo-img-cont"></div>
        <div class="bee-img">
          <div v-show="!showImg" class="bee-loading-img"></div>
          <img class="img-bee" @load="showImg = true" :src="'https://gateway.nutbox.app/ipfs/' + BlackUris[selectedId-1]" alt="">
          <img v-show="!showImg" class="img-def" src="@/assets/img/bee_def.jpg" alt="">
          <div class="bee-img-bg"></div>
        </div>
        <div class="g-num silver-gradient-text"><span>B</span><i>{{ prefixInteger(selectedId, 2) }}</i></div>
      </div>
      <!-- 下面的btn-mint与h3不同时存在，
      btn-mint是mint的按钮，h3是返回的结果
       添加class：disable为不可用状态-->
      <div v-if="nftBeenMinted(selectedId)"></div>
      <button v-else-if="!mintResult " class="btn-mint btn-popup fx-align" :class="(state == 2 || state == 3 || state == 5) ? 'disable' : ''"
        :disabled="loading || connecting || state == 2 || state == 3 || state == 5"  
        @click="btnClick">
        <div class="mint-text">
          <p>20,000,000 $Mferc</p>
          <div class="fx-align">
            <div class="btn-loading" v-show="loading || connecting"></div>
            <h5>{{ mintBtn }}</h5>
          </div>
        </div>
      </button>
      <h3 v-else>恭喜！您获得了#B{{ prefixInteger(selectedId, 2) }}黑蜂</h3>
      <p v-show="nftBeenMinted(selectedId)" class="c-r text-center">
        黑色蜜蜂已经出售了
      </p>
      <p v-show="state===3" class="c-r text-center">
        您已经mint了一个黑蜂
      </p>
      <p v-show="state===5" class="c-r text-center">
        您的余额不足
      </p>
      <div class="btn-close" @click="showBeePopUp=false;mintResult=false"></div>
    </PopUp>
    <!-- 提示弹层 -->
    <PopUp :show.sync="showTipsPopUp" class="warimg-pop">
      <div class="warimg-img"></div>
      <h3>
        <p>对不起，您当前钱包没有MINT黑色</p>
        <p>蜜蜂NFT的资格。</p>
        <p>如有疑问，请联系社区治理工会</p>
      </h3>
      <div class="btn-img" @click="showTipsPopUp=false"></div>
      <div class="btn-close" @click="showTipsPopUp=false"></div>
    </PopUp>
    <!-- 说明弹层 -->
    <PopUp :show.sync="showExplainPopUp" class="ex-pop">
      <div class="ex-bg">
        <h2>
          <p>黑色蜜蜂</p>
          <p>社区特殊贡献者</p>
        </h2>
        <div class="info-cont">
          <h3>数量：限量66个，当前还有{{ 66 - totalSupply }}个</h3>
          <h3>售价：20.000,000 $Mferc (直接销毀）</h3>
          <dl>
            <dt>持有者权益：</dt>
            <dd class="fx"><i class="fx-shrink"></i>参与社区提案投票</dd>
            <dd class="fx"><i class="fx-shrink"></i>收获社区空投福利</dd>
            <dd class="fx"><i class="fx-shrink"></i>可增加wormhole3平台莫比社区的Credit值，提高挖矿效率</dd>
            <dd class="fx"><i class="fx-shrink"></i>可分享第三方平台交易的版税收益</dd>
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
import { BaseUrl, BlackBeeCANBaseUri, BlackUris, BeeContracts } from '@/nft-config'
import { MFERC, Arbitrum } from '@/config'
import { mapState } from 'vuex'
import { ethers } from 'ethers'
import { getApprovement, approve } from '@/utils/asset'
import { getTotalSupply, checkBlackBeeWhitelist, getMintedBlackBeeIds, mintBlackBee } from '@/utils/nft'
import { prefixInteger } from '@/utils/helper'
import { setupNetwork } from '@/utils/web3'

export default {
  name: 'BeeSilver',
  components: {
    Header,
    Footer,
    PopUp
  },
  computed: {
    ...mapState('web3', ['account', 'chainId']),
    ...mapState('nft', ['blackAllownce', 'hasMintedBlack', 'blackWhitelistOk', 'mintedBlackBeeIds']),
    ...mapState('asset', ['mfercBalance']),
    state() {
      if (this.chainId != Arbitrum.id) {
        this.mintBtn = 'Connect'
        return 1  // wrong chain
      }
      if (this.totalSupply >= 66) {
        this.mintBtn = 'Sold Out'
        return 2 // no more to mint
      }
      if (this.hasMintedBlack) {
        this.mintBtn = 'Minted'
        return 3 // i have mint a black bee
      }
      if (!this.blackWhitelistOk) {
        this.mintBtn = "Mint"
        return 4 // not in white list or expired
      }
      if (this.mfercBalance < 20000000) {
        this.mintBtn = "Mint"
        return 5 // insufficient balance
      }
      if (this.blackAllownce < 20000000) {
        this.mintBtn = 'Approve'
        return 6 // need approve
      }
      this.mintBtn = 'Mint'
      return 7 // can mint
    }
  },
  watch: {
    account(newValue, oldValue) {
      if (ethers.utils.isAddress(newValue)) {
        this.updateInfo()
      }
    }
  },
  data () {
  	return {
      showBeePopUp: false,
      showTipsPopUp: false,
      selectedId: 0,
      BlackUris,
      BaseUrl,
      BlackBeeCANBaseUri,
      showExplainPopUp: false,
      picBaseUrl: 'https://gateway.nutbox.app/ipfs/',
      totalSupply: 0,
      loading: false,
      mintBtn: '',
      mintResult: false,
      showImg: false,
      connecting: false
    }
  },
  methods: {
    prefixInteger,
    nftBeenMinted(index) {
      try {
        return this.mintedBlackBeeIds.indexOf(index) !== -1
      } catch (e) {
        return false
      }
    },
    async connect() {
      if (this.connecting) return;
      try{
        this.connecting = true
        await setupNetwork();
      } catch (e) {

      } finally {
        this.connecting = false
      }
    },
    updateInfo() {
      // get total supply
      getTotalSupply('black').then(supply => {
        this.totalSupply = supply
      }).catch()

      // getMintedBlackBeeIds
      getMintedBlackBeeIds().then(ids => {
        this.$store.commit('nft/saveMintedBlackBeeIds', ids)
      }).catch()
      
      if (!ethers.utils.isAddress(this.account)) return;
      // get approve
      getApprovement(this.account, MFERC, BeeContracts.black).then(res => {
        this.$store.commit('nft/saveBlackAllownce', res)
      }).catch()
      // getBlack bee white list
      checkBlackBeeWhitelist(this.account).then(res => {
        const { inWhiteList, updateTime, hasMinted, expirationDay } = res
        this.$store.commit('nft/saveBlackWhitelistOk', inWhiteList && ((new Date().getTime() / 1000) - updateTime < expirationDay));
        this.$store.commit('nft/saveHasMintedBlack', hasMinted)
      }).catch()
    },
    async btnClick() {
      if (this.loading) return;
      if (this.state === 4) {
        this.showBeePopUp = false;
        this.showTipsPopUp = true;
      }
      if (this.state === 1) {
        await this.connect()
      }
      if (this.state === 6) {
        await this.approve();
      }
      if (this.state === 7) {
        await this.mint();
      }
    },
    async approve() {
      try{
        this.loading = true
        await approve(this.account, MFERC, BeeContracts.black);
        await this.updateInfo();
      } catch(e) {
        console.log('approve fail:', e)
        this.$store.commit('setAlert', {
          title: "授权失败",
          content: e
        });
      } finally {
        this.loading = false
      }
    },
    async mint() {
      try{
        this.loading = true
        await mintBlackBee(this.selectedId);
        await this.updateInfo();
        this.mintResult = true;
      } catch(e) {
        console.log('mint fail:', e)
        this.$store.commit('setAlert', {
          title: "交易失败",
          content: e
        });
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.updateInfo();
  },
}
</script>
<style lang="scss" scoped>
	@import 'BeeSilver';
</style>
