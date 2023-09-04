<template>
  <header class="fx fx-y-center fx-x-between">
    <div class="logo-cont"></div>
    <!-- Conect Wallet -->
    <div class="btn-connect">Conect Wallet</div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/assets/css/common.scss";
  header{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    padding: 2.5rem;
  }
  .logo-cont{
    width: 6.6875rem;
    height: 4.1875rem;
    background: url("@/assets/img/logo.png") no-repeat;
    background-size: 100%;
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
</style>
