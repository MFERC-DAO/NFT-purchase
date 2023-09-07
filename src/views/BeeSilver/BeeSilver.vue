<template>
  <div class="beeSilver">
    <Header></Header>
    <article>
      <section class="cont">
       <div class="bee-cont">
        <ul class="fx fx-wrap">
          <!-- 已经售出添加class：sold-out -->
          <li v-for="item in 66" @click="selectedId = item;showBeePopUp = true">
            <div class="cover"></div>
            <div class="img-cont"><img :src="BaseUrl+item" alt=""></div>
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
        <div class="g-num silver-gradient-text"><span>G</span><i>{{ selectedId }}</i></div>
      </div>
      <!-- 下面的btn-mint与h3不同时存在，
      btn-mint是mint的按钮，h3是返回的结果 -->
      <div class="btn-mint"></div>
      <h3>恭喜！您获得了#G062金蜂</h3>
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
import { BaseUrl } from '@/config'

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
      showTipsPopUp: false,
      selectedId: 0,
      BaseUrl,
      showExplainPopUp: false
    }
  }
}
</script>
<style lang="scss" scoped>
	@import 'BeeSilver';
</style>
