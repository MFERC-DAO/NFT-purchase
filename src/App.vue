<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view ></router-view>
    </transition>
    <AlertPop :show.sync="showAlertPop">
      <template v-slot:title>
        <div>{{ alertTitle }}</div>
      </template>
      <div>{{ alertContent }}</div>
    </AlertPop>
  </div>
</template>

<script>
import { setupNetwork, chainChanged } from '@/utils/web3';
import { mapState } from 'vuex';
import { getBalance } from '@/utils/asset'
import { ethers } from 'ethers';
import { MFERC } from './config';
import AlertPop from '@/components/AlertPop'

export default {
  name: 'App',
  computed: {
    ...mapState('web3', ['account']),
    ...mapState(['showAlertPop', 'alertTitle', 'alertContent'])
  },
  components: {
    AlertPop,
  },
  data() {
    return {
      timeinterval: null
    }
  },
  mounted () {
    setupNetwork().catch(e => {
      console.error('connect fail:', e)
    });
    chainChanged().catch();
    this.timeinterval = setInterval(() => {
      if (ethers.utils.isAddress(this.account) && ethers.utils.isAddress(MFERC)) {
        getBalance(this.account, MFERC).then(balance => {
          this.$store.commit('asset/saveMfercBalance', balance)
        })
      }
    }, 3000);
  },
}
</script>

<style lang="scss">
	@import "assets/css/base.scss";
</style>
