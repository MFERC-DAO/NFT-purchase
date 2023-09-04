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

<style scoped lang="scss">
  @import "@/assets/css/common.scss";
  footer{
    background: linear-gradient(to top,#000 50%,transparent 100%);
  }
  article{
    padding-bottom: 6.5rem;
  }
  .myNFT{
    width: 100%;
    min-height: 100vh;
    background: url("@/assets/img/my_bg.jpg") no-repeat;
    background-size: 100%;
    background-attachment: fixed;
    .line{
      width: 100%;
      height: 2px;
      background: url("@/assets/img/my_line.png") no-repeat;
      background-size: 100%;
    }
  }
  .title-cont{
    text-align: center;
    padding: 3rem 0 0;
    h1{
      font-size: 3rem;
      font-weight: bold;
    }
    h5{
      padding-bottom: 2rem;
      font-size: 0.875rem;
      color: $color-w-m;
    }
  }
  .sub-title{
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1rem 2rem;
  }
  ul{
    padding: 2rem 2rem 1.5rem;
    li{
      width: 72px;
      height: 83px;
      margin-left: 15px;
      margin-bottom: 15px;
      background: url("@/assets/img/my_bee_border.png") no-repeat;
      background-size: 100%;
      position: relative;
      overflow: hidden;
      transition: all 0.15s ease;
      &:nth-child(4n + 1){
        margin-left: 0;
      }
      &::before,&::after{
        content: "";
        width: 40px;
        height: 24px;
        position: absolute;
        top: -2px;
        z-index: 3;
      }
      &::before{
        background: url("@/assets/img/my_bee_tl_cover.png") no-repeat;
        background-size: 100%;
        left: 0;
      }
      &::after{
        background: url("@/assets/img/my_bee_tr_cover.png") no-repeat;
        background-size: 100%;
        right: 0;
      }
      .img-cont{
        width: 70px;
        height: 83px;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 1px;
        img{
          width: 100%;
          min-height: 100%;
          object-fit: cover;
        }

      }
      .cover{
        &::before,&::after{
          content: "";
          width: 40px;
          height: 24px;
          position: absolute;
          bottom: -2px;
          z-index: 3;
        }
        &::before{
          background: url("@/assets/img/my_bee_bl_cover.png") no-repeat;
          background-size: 100%;
          left: 0;
        }
        &::after{
          background: url("@/assets/img/my_bee_br_cover.png") no-repeat;
          background-size: 100%;
          right: 0;
        }
      }
    }
  }
  @media only screen and (min-width:359px) and (max-width:374px) {
    ul{
      li{
        margin-left: 10px
      }
    }
  }
  @media only screen and (min-width:390px) {
    ul{
      li{
        margin-left: 20px
      }
    }
  }
  @media only screen and (min-width:413px) {
    ul{
      li{
        margin-left: 25px
      }
    }
  }
</style>
