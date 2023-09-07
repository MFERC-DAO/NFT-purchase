<template>
  <div class="beeSilver">
    <Header></Header>
    <article>
      <section class="cont">
       <div class="bee-cont">
        <ul class="fx fx-wrap">
          <!-- 已经售出添加class：sold-out -->
          <li v-for="item in 66">
            <div class="cover"></div>
            <div class="img-cont"><img src="@/assets/img/bee_img.jpg" alt=""></div>
          </li>
        </ul>
       </div>
        <div class="info-cont">
          <div class="choose-tips">选择你喜欢的黑蜂</div>
          <div class="num-cont fx-align gold-gradient-text"><span>限量：45</span>/66</div>
          <div class="tips fx-align"><i class="icon-i"></i><span>黑蜂NFT说明书</span></div>
        </div>
      </section>
    </article>
    <!-- mint弹层 -->
    <PopUp :show.sync="showBeePopUp" class="mint-bee-pop">
      <div class="bee-img-grp">
        <div class="light-img"></div>
        <div class="bee-img">
          <img src="@/assets/img/bee_img.jpg" alt="">
          <div class="bee-img-bg"></div>
        </div>
        <div class="g-num silver-gradient-text"><span>G</span><i>062</i></div>
      </div>
      <!-- 下面的btn-mint与h3不同时存在，
      btn-mint是mint的按钮，h3是返回的结果 -->
      <div class="btn-mint"></div>
      <h3>恭喜！您获得了#G062金蜂</h3>
      <div class="btn-close"></div>
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
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PopUp from '@/components/PopUp'
export default {
  name: 'BeeSilver',
  components: {
    Header,
    Footer,
    PopUp
  },
  data () {
  	return {
      showBeePopUp: false,
      showTipsPopUp: false
    }
  }
}
</script>
<style lang="scss" scoped>
	@import 'BeeSilver';
</style>
