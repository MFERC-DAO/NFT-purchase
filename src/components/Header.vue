<template>
  <header class="fx fx-y-center fx-x-between">
    <div class="logo-cont" @click="gotoOfficial"></div>
    <!-- Conect Wallet -->
    <div v-if="started" class="btn-connect" @click="connect">{{ showingAddress }}</div>
  </header>
</template>

<script>
import { setupNetwork } from '@/utils/web3'
import { accountChanged, getAccounts } from '@/utils/account'
import { mapState } from 'vuex'
import { Arbitrum, startTime } from '@/config'

export default {
  name: 'Header',
  props: {
    msg: String
  },
  computed: {
    ...mapState('web3', ['account', 'chainId']),
    showingAddress() {
      if (this.account && (this.chainId == Arbitrum.id)) {
        return this.account.slice(0, 6) + '...' + this.account.slice(-6)
      }
      return 'Connect Wallet'
    },
    started() {
      return true
      return new Date().getTime() > (startTime * 1000)
    }
  },
  methods: {
    gotoOfficial() {
      window.open('https://alpha.wormhole3.io/community-detail/cd490b94c333', '__blank')
    },
    async connect() {
      await setupNetwork()
    },
  },
  mounted () {
    if (this.started) {
      accountChanged(() => {
          this.$router.go(0)
      }).catch()
      getAccounts(true).then(wallet => {
      }).catch();
    }
  },
}
</script>

<style scoped lang="scss">
  @import "@/assets/css/common.scss";
  header{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 996;
    width: 100%;
    padding: 2.5rem;
  }
  .logo-cont{
    width: 6.6875rem;
    height: 4.1875rem;
    background: url("@/assets/img/logo.png") no-repeat;
    background-size: 100%;
    cursor: pointer;
  }
  .btn-connect{
    width: 11.5rem;
    height: 3.4rem;
    line-height: 3.4rem;
    text-align: center;
    color: $color-w-m;
    font-size: 0.875rem;
    background: url("@/assets/img/connect_btn_bg.png") no-repeat;
    background-size: 100%;
  }
  @media only screen and (min-width:750px) {
    .logo-cont{
      transition: all 0.15s ease;
      &:hover{
        transform: scale(1.03);
      }
    }
    .btn-connect{
      cursor: pointer;
      transition: all 0.15s ease;
      &:hover{
        transform: scale(1.03);
        color: #fff;
      }
      &:active{
        transform: scale(1);
        color: #ccc;
      }
    }
  }
</style>
