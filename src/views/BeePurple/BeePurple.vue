<template>
  <div class="beePurple">
    <Header></Header>
    <article>
      <section class="cont">
        <div class="bee-bg fx-align">敬请期待</div>
        <div class="btn-mint"></div>
        <div class="num-cont fx-align"><span class="f-b">限量：0</span>/666</div>
        <!-- <div class="tips fx-align"><i class="icon-i"></i><span>紫蜂NFT说明书</span></div> -->
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
    }
  }
}
</script>
<style lang="scss" scoped>
	@import 'BeePurple';
</style>