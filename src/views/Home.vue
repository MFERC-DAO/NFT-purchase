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
          <img src="../../src/assets/img/bee_img.jpg" alt="">
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

<style scoped lang="scss">
  @import "@/assets/css/common.scss";
  article{
    .bee-cont{
      width: 100%;
      margin-top: 9rem;
      video{
        width: 100%;
        height: 35rem;
      }
    }
    .num-cont{
      text-align: center;
      font-size: 2.5rem;
      margin: 2.5rem auto 0;
    }
    .tips{
      font-size: 0.75rem;
      color: $color-b-m;
      padding-top: 0.625rem;
    }
    .icon-i{
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      background: url("@/assets/img/i_icon.png") no-repeat;
      background-size: 100%;
      margin-right: 0.625rem;
    }
  }
  .btn-mint{
    width: 15rem;
    height: 6.25rem;
    margin: -2.5rem auto 0;
    background: url("@/assets/img/btn_main.png") no-repeat;
    background-size: 100%;
    position: relative;
    z-index: 3;
    transition: all 0.15s ease;
    &:active{
      transform: scale(0.98);
      filter: brightness(70%);
    }
  }
  .popup-warpper.mint-pop{
    .mint-pop-img{
      width: 16.6875rem;
      height: 18.625rem;
      margin: 0 auto;
      background: url("@/assets/img/mint_img.png") no-repeat;
      background-size: 100%;
    }
    h3{
      font-size: 1.75rem;
      text-align: center;
      width: 65%;
      padding-top: 1.25rem;
      margin: 0 auto;
    }
    .btn-mint.btn-popup{
      margin: 3rem auto 0;
    }
    .btn-close{
      margin: 2.5rem auto 0;
    }
  }
  .popup-warpper.mint-bee-pop{
    .bee-img-grp{
      width: 21.375rem;
      height: 29.8125rem;
      margin: 0 auto;
      opacity: 0.8;
      background: url("@/assets/img/g_bee_card_bg.png") no-repeat;
      background-size: 100%;
      position: relative;
      .light-img{
        width: 6.25rem;
        height: 10.8125rem;
        background: url("@/assets/img/g_bee_card_light.png") no-repeat;
        background-size: 100%;
        position: absolute;
        top: 0;
        right: -3rem;
        z-index: 5;
      }
      .bee-img{
        width: 18rem;
        height: 18rem;
        overflow: hidden;
        position: absolute;
        top: 5rem;
        left: 2.75rem;
        &::after,
        &::before{
          content: "";
          width: 1.3rem;
          height: 1.3rem;
          position: absolute;
          right: 0;
        }
        &:before{
          top: 0;
          background: url("@/assets/img/g_bee_card_border_up.png") no-repeat;
          background-size: 100%;
        }
        &::after{
          bottom: 0;
          background: url("@/assets/img/g_bee_card_border_down.png") no-repeat;
          background-size: 100%;
        }
        img{
          width: 100%;
          min-height: 100%;
          object-fit: cover;
        }
        .bee-img-bg{
          width: 100%;
          height: 100%;
          background: url("@/assets/img/g_bee_card_border.png") no-repeat;
          background-size: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 9;
        }
      }
      .g-num{
        position: absolute;
        bottom: 0;
        left: 3rem;
        font-size: 3.5rem;
        filter: brightness(120%);
        span{
          font-weight: 900;
        }
        i{
          font-weight: 100;
          font-style: normal;
        }
      }
    }
    h3{
      font-size: 2rem;
      text-align: center;
      padding: 3rem 0 0;
      font-weight: bold;
    }
    .btn-close{
      margin: 2.5rem auto 0;
    }
  }
  .popup-warpper.ex-pop{
    ::v-deep .popup-cont{
      top: 15%;
    }
    .ex-bg{
      width: 28.375rem;
      height: 48.75rem;
      background: url("@/assets/img/explain_bg.png") no-repeat;
      background-size: 100%;
      margin: 0 auto;
      h2{
        font-size: 3rem;
        text-align: center;
        font-weight: bold;
        padding-top: 4rem;
      }
      .info-cont{
        padding: 2.5rem 3rem;
        font-size: 1.3rem;
        h3{
          padding-bottom: 0.3125rem;
        }
        dd{
          padding-top: 0.3125rem;
          i{
            display: inline-block;
            width: 1.25rem;
            height: 1.25rem;
            background: url("@/assets/img/explain_dot.png") no-repeat;
            background-size: 100%;
            margin-right: 1rem;
            margin-top: 0.3rem;
          }
        }
      }
      .btn-close{
        margin: 2rem auto ;
      }
    }
  }
  @media only screen and (min-width:950px) {
    .gold-gradient-text {
      background: linear-gradient(160deg,#b5771f 10%, #9a5c03 30%,#bf8625 45% ,#f7e773 50% , #b1841c 55%,#451d00 56% , #c28426 86%, #8d6d30 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .btn-mint{
      margin: 2.5rem auto 0;
      cursor: pointer;
      &:hover{
        transform: scale(1.03);
        filter: brightness(130%);
      }
    }
  }
</style>
