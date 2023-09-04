<template>
  <div class="home">
    <Header></Header>
    <article>
      <section class="cont">
       <!-- <div class="bee-cont"></div> -->
       <div class="bee-cont"><video autoplay muted loop><source src="@/assets/video/vdieo_01.mp4" type="video/mp4"></video></div>
        <div class="btn-mint"></div>
        <div class="num-cont fx-align gold-gradient-text"><span class="f-b">限量：6666</span>/6666</div>
        <div class="tips fx-align"><i class="icon-i"></i>金蜂NFT说明书</div>
      </section>
    </article>
    <!-- mint弹层 -->
    <PopUp :show.sync="showMintPopUp" class="mint-pop">
      <div class="mint-pop-img"></div>
      <h3>
        <p>每一次MINT就像拆开一个盲盒</p>
        <p>给你一份惊喜！</p>
      </h3>
      <div class="btn-mint btn-popup"></div>
      <div class="btn-close"></div>
    </PopUp>
    <!-- mint弹层 -->
    <PopUp :show.sync="showBeePopUp" class="mint-bee-pop">
      <div class="bee-img-grp">
        <div class="light-img"></div>
        <div class="bee-img">
          <img src="@/assets/img/bee_img.jpg" alt="">
          <div class="bee-img-bg"></div>
        </div>
        <div class="g-num gold-gradient-text"><span>G</span><i>062</i></div>
      </div>
      <h3>恭喜！您获得了#G062金蜂</h3>
      <div class="btn-close"></div>
    </PopUp>
    <!-- 说明弹层 -->
    <PopUp :show.sync="showExplainPopUp" class="ex-pop">
      <div class="ex-bg">
        <h2>
          <p>金色蜜蜂</p>
          <p>代表社区共识者</p>
        </h2>
        <div class="info-cont">
          <h3>数量：限量6666个，当前还有6613个</h3>
          <h3>售价：1.000,000 $Mferc (直接销毀）</h3>
          <dl>
            <dt>持有者权益：</dt>
            <dd class="fx"><i class="fx-shrink"></i>参与社区提案投票</dd>
            <dd class="fx"><i class="fx-shrink"></i>收荻社区空投福利</dd>
            <dd class="fx"><i class="fx-shrink"></i>可增加wormhole3平台莫比社区的Credit值，提商挖矿效串（当前特有1只金色蜜蜂，可增加 34556 Credit 值)</dd>
            <dd class="fx"><i class="fx-shrink"></i>可以通过交易NFT获得收益</dd>
            <dd class="fx"><i class="fx-shrink"></i>更多惊嘉待后绥解锁</dd>
          </dl>
        </div>
        <div class="btn-close"></div>
      </div>
    </PopUp>
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
<style lang="scss" scoped>
	@import 'Home';
</style>
