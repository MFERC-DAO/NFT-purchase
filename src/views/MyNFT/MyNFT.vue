<template>
  <div class="myNFT">
    <!-- <Header></Header> -->
    <article>
      <div class="title-cont">
        <h1>我的</h1>
        <h5>0X1F..8963</h5>
        <div class="line"></div>
      </div>
      <h3 class="sub-title">我的黑色蜜蜂</h3>
      <div>
        <ul class="fx fx-wrap">
          <li v-for="item in 2">
            <div class="cover"></div>
            <div class="img-cont"><img src="@/assets/img/bee_img.jpg" alt=""></div>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <h3 class="sub-title">我的紫色蜜蜂</h3>
      <div>
        <ul class="fx fx-wrap">
          <li v-for="item in 2">
            <div class="cover"></div>
            <div class="img-cont"><img src="@/assets/img/bee_img.jpg" alt=""></div>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <h3 class="sub-title">我的金色蜜蜂</h3>
      <div>
        <ul class="fx fx-wrap">
          <li v-for="item in 20">
            <div class="cover"></div>
            <div class="img-cont"><img src="@/assets/img/bee_img.jpg" alt=""></div>
          </li>
        </ul>
      </div>
    </article>
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
	@import 'MyNFT';
</style>
