<template>
  <div class="myNFT">
    <Header></Header>
    <article>
      <div class="title-cont">
        <h1>我的</h1>
        <h5>0X1F..8963</h5>
        <div class="line"></div>
      </div>
      <div class="cont">
        <h3 class="sub-title">我的黑色蜜蜂</h3>
        <ul class="fx fx-wrap">
          <li v-for="item in 2">
            <div class="bee-cont">
              <div class="cover"></div>
              <div class="img-cont"><img src="@/assets/img/bee_img.jpg" alt=""></div>
            </div>
            <h3>#B009</h3>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="cont">
        <h3 class="sub-title">我的紫色蜜蜂</h3>
        <ul class="fx fx-wrap">
          <li v-for="item in 2">
            <div class="bee-cont">
              <div class="cover"></div>
              <div class="img-cont"><img src="@/assets/img/bee_img.jpg" alt=""></div>
            </div>
            <h3>#P045</h3>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="cont-g">
        <h3 class="sub-title">我的金色蜜蜂</h3>
        <ul class="fx fx-wrap">
          <li v-for="item in 20">
            <div class="bee-cont">
              <div class="cover"></div>
              <div class="img-cont"><img src="@/assets/img/bee_img.jpg" alt=""></div>
            </div>
            <h3>#G0015</h3>
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
