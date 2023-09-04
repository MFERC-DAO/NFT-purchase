<template>
  <div class="beePurple">
    <Header></Header>
    <article>
      <section class="cont">
        <div class="bee-bg fx-align">敬请期待</div>
        <div class="btn-mint"></div>
        <div class="num-cont fx-align"><span class="f-b">限量：0</span>/666</div>
        <div class="tips fx-align"><i class="icon-i"></i>金蜂NFT说明书</div>
      </section>
    </article>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PopUp from '@/components/PopUp'
export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    PopUp
  },
  data () {
  	return {
      showMintPopUp: false,
      showBeePopUp: false,
      showExplainPopUp: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/css/common.scss";
  article{
    width: 100%;
    height: 100vh;
    // background: radial-gradient(#342177,#000);
    .cont{
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-60%);

      .bee-bg{
        width: 100%;
        height: 53rem;
        margin: 0 auto;
        background: url("@/assets/img/z_bee_bg.jpg") no-repeat;
        background-size: 100%;
        font-size: 4rem;
      }
      .btn-mint{
        width: 15rem;
        height: 6.25rem;
        margin: -8rem auto 0;
        background: url("@/assets/img/btn_main_dis.png") no-repeat;
        background-size: 100%;
        position: relative;
        z-index: 3;
      }
      .num-cont{
        color: $color-w-m;
        text-align: center;
        font-size: 2.5rem;
        margin: 2.5rem auto 0;
      }
      .tips{
        font-size: 0.75rem;
        color: $color-b-m;
        padding-top: 0.625rem;
      }
    }
  }
</style>
