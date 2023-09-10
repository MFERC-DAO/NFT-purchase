<template>
  <div class="beeSilver">
    <Header></Header>
    <article>
      <section class="cont">
       <div class="bee-cont">
        <ul class="fx fx-wrap">
          <!-- 已经售出添加class：sold-out -->
          <li v-for="item in 66" @click="selectedId = item;showBeePopUp = true" :class="nftBeenMinted(item - 1) ? 'sold-out' : ''">
            <div class="cover"></div>
            <div class="img-cont"><img :src="BlackBeeCANBaseUri+item + '.jpg'" alt=""></div>
          </li>
        </ul>
       </div>
        <div class="info-cont">
          <div class="choose-tips">选择你喜欢的黑蜂</div>
          <div class="num-cont fx-align gold-gradient-text"><span>限量：{{ prefixInteger(totalSupply, 2) }}</span>/66</div>
          <div class="tips fx-align"><i class="icon-i"></i><span>黑蜂NFT说明书</span></div>
        </div>
      </section>
    </article>
    <!-- mint弹层 -->
    <PopUp :show.sync="showBeePopUp" :id="selectedId" class="mint-bee-pop">
      <div class="bee-img-grp">
        <div class="light-img"></div>
        <div class="bee-img">
          <img :src="'https://gateway.nutbox.app/ipfs/' + BlackUris[selectedId-1]" alt="">
          <div class="bee-img-bg"></div>
        </div>
        <div class="g-num silver-gradient-text"><span>G</span><i>{{ prefixInteger(selectedId, 2) }}</i></div>
      </div>
      <!-- 下面的btn-mint与h3不同时存在，
      btn-mint是mint的按钮，h3是返回的结果 -->
      <div class="btn-mint"></div>
      <h3>恭喜！您获得了#G{{ prefixInteger(selectedId, 2) }}黑蜂</h3>
      <div class="btn-close" @click="showBeePopUp=false"></div>
    </PopUp>
    <!-- 提示弹层 -->
    <PopUp :show.sync="showTipsPopUp" class="warimg-pop">
      <div class="warimg-img"></div>
      <h3>
        <p>对不起，您当前钱包没有MINT黑色</p>
        <p>蜜蜂NFT的资格。</p>
        <p>如有疑问，请联系社区治理工会</p>
      </h3>
      <div class="btn-img"></div>
      <div class="btn-close"></div>
    </PopUp>
    <!-- 说明弹层 -->
    <PopUp :show.sync="showExplainPopUp" class="ex-pop">
      <div class="ex-bg">
        <h2>
          <p>黑色蜜蜂</p>
          <p>代表社区共识者</p>
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
import { MFERC } from '@/config'
import { mapState } from 'vuex'
import { ethers } from 'ethers'
import { getApprovement, approve } from '@/utils/asset'
import { getTotalSupply, checkBlackBeeWhitelist, getMintedBlackBeeIds, mintBlackBee } from '@/utils/nft'
import { prefixInteger } from '@/utils/helper'

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
      console.log('chain id', this.chainId, this.goldenAllownce)
      if (this.chainId != Arbitrum.id) {
        return 1  // wrong chain
      }
      if (this.totalSupply >= 66) {
        return 2 // no more to mint
      }
      if (this.hasMintedBlack) {
        return 3 // i have mint a black bee
      }
      if (!this.blackWhitelistOk) {
        return 4 // not in white list or expired
      }
      if (this.mfercBalance < 20000000) {
        return 5 // insufficient balance
      }
      if (this.blackAllownce < 20000000) {
        return 6 // need approve
      }
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
      loading: false
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
    updateInfo() {
      if (!ethers.utils.isAddress(this.account)) return;
      // get approve
      getApprovement(this.account, MFERC, BeeContracts.black).then(res => {
        this.$store.commit('nft/saveBlackAllownce', res)
      }).catch()
      // getBlack bee white list
      checkBlackBeeWhitelist(this.account).then(res => {
        const { inWhiteList, updateTime, hasMinted, expirationDay } = res
        this.$store.commit('nft/saveBlackWhitelistOk', inWhiteList && (new Date().getTime() - updateTime < expirationDay));
        this.$store.commit('nft/saveHasMintedBlack', hasMinted)
      })
      // get total supply
      getTotalSupply('black').then(supply => {
        this.totalSupply = supply
      })

      // getMintedBlackBeeIds
      getMintedBlackBeeIds().then(ids => {
        this.$store.commit('nft/saveMintedBlackBeeIds', ids)
      })
    },
    async btnClick() {
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
        await approve(this.account, MFERC, BeeContracts.black)
      } catch(e) {
        
      } finally {
        this.loading = false
      }
    },
    async mint() {
      try{
        this.loading = true
        await mintBlackBee(this.selectedId);
      } catch(e) {
        
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
