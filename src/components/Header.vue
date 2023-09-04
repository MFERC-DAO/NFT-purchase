<template>
  <header class="fx fx-y-center fx-x-between">
    <div class="logo-cont" @click="gotoOfficial"></div>
    <!-- Conect Wallet -->
    <div class="btn-connect" @click="connect">{{ showingAddress }}</div>
  </header>
</template>

<script>
import { setupNetwork } from '@/utils/web3'
import { accountChanged, getAccounts } from '@/utils/account'
import { mapState } from 'vuex'

export default {
  name: 'Header',
  props: {
    msg: String
  },
  computed: {
    ...mapState('web3', ['account']),
    showingAddress() {
      if (this.account) {
        return this.account.slice(0, 6) + '...' + this.account.slice(-6)
      }
      return 'Connect Wallet'
    }
  },
  methods: {
    gotoOfficial() {
      window.open('https://alpha.wormhole3.io/community-detail/cd490b94c333', '__blank')
    },
    async connect() {
      if (this.account) return;
      try {
        const connected = await setupNetwork()
      } catch (e) {
        console.log('connect wallet fail:', e);
      } finally{
        
      }
    }
  },
  mounted () {
    accountChanged(() => {
        this.$router.go(0)
    }).catch()
    getAccounts(true).then(wallet => {
    }).catch();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    width: 9.75rem;
    height: 2.875rem;
    line-height: 2.875rem;
    text-align: center;
    color: $color-w-m;
    font-size: 0.875rem;
    background: url("@/assets/img/connect_btn_bg.png") no-repeat;
    background-size: 100%;
  }
  @media only screen and (min-width:950px) {
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
