<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
import { setupNetwork, chainChanged } from '@/utils/web3';

export default {
  name: 'App',
  mounted () {
    setupNetwork().catch();
    chainChanged().catch();
  },
}
</script>

<style lang="scss">
	@import "assets/css/base.scss";
</style>
