<template>
  <div class="beeSilver">
    <Header></Header>
    <article>
      <section class="cont">
       <div class="bee-cont">
        <ul class="fx fx-wrap">
          <li v-for="item in 66">
            <div class="cover"></div>
            <div class="img-cont"><img src="@/assets/img/bee_img.jpg" alt=""></div>
          </li>
        </ul>
       </div>
        <div class="info-cont">
          <div class="choose-tips">选择你喜欢的黑蜂</div>
          <div class="num-cont fx-align gold-gradient-text"><span>限量：45</span>/66</div>
          <div class="tips fx-align"><i class="icon-i"></i>黑蜂NFT说明书</div>
        </div>
      </section>
    </article>
    <!-- mint弹层 -->
    <PopUp :show.sync="showBeePopUp" class="mint-bee-pop">
      <div class="bee-img-grp">
        <div class="light-img"></div>
        <div class="bee-img">
          <img src="../../src/assets/img/bee_img.jpg" alt="">
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

<style scoped lang="scss">
  @import "@/assets/css/common.scss";
  Header{
    background: linear-gradient(to bottom,#000 50%,transparent 100%);
  }
  footer{
    background: #000;
  }
  article{
    .bee-cont{
      width: 100%;
      position: relative;
      ul{
        margin: 0 auto;
        width: 375px;
        padding: 100px 20px 180px;
      }
      li{
        width: 100px;
        height: 115px;
        margin-left: 16px;
        margin-top: -3px;
        background: url("@/assets/img/s_bee_border.png") no-repeat;
        background-size: 100%;
        position: relative;
        overflow: hidden;
        transition: all 0.15s ease;
        &:active{
          transform: scale(0.98);
          filter: brightness(70%);
        }
        &.sold-out{
          .cover{
            width: 100%;
            height: 100%;
            background: url("@/assets/img/s_bee_out.png") no-repeat;
            background-size: 100%;
            position: relative;
            z-index: 5;
          }
        }
        &:nth-child(5n - 1){
          margin-left: 60px;
        }
        &:nth-child(5n + 1){
          margin-left: 0;
        }
        &::before,&::after{
          content: "";
          width: 53px;
          height: 30px;
          position: absolute;
          top: -2px;
          z-index: 3;
        }
        &::before{
          background: url("@/assets/img/s_bee_tl_cover.png") no-repeat;
          background-size: 100%;
          left: 0;
        }
        &::after{
          background: url("@/assets/img/s_bee_tr_cover.png") no-repeat;
          background-size: 100%;
          right: 0;
        }
        .img-cont{
          width: 98px;
          height: 115px;
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
            width: 53px;
            height: 30px;
            position: absolute;
            bottom: -2px;
            z-index: 3;
          }
          &::before{
            background: url("@/assets/img/s_bee_bl_cover.png") no-repeat;
            background-size: 100%;
            left: 0;
          }
          &::after{
            background: url("@/assets/img/s_bee_br_cover.png") no-repeat;
            background-size: 100%;
            right: 0;
          }
        }
      }

    }
    .info-cont{
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 88;
      width: 100%;
      padding-bottom: 8rem;
      background: linear-gradient(to top,#000 60%,transparent 100%);
      .choose-tips{
        font-size: 2.25rem;
        text-align: center;
      }
      .num-cont{
        text-align: center;
        font-size: 2.5rem;
        margin: 0.5rem auto 0;
        span{
          font-weight: 900
        }
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
  }
  .btn-mint{
    width: 15rem;
    height: 6.25rem;
    margin: 2.5rem auto 0;
    background: url("@/assets/img/btn_main.png") no-repeat;
    background-size: 100%;
    position: relative;
    z-index: 3;
  }
  .popup-warpper.mint-bee-pop{
    .bee-img-grp{
      width: 21.375rem;
      height: 29.8125rem;
      margin: 0 auto;
      opacity: 0.8;
      background: url("@/assets/img/s_bee_card_bg.png") no-repeat;
      background-size: 100%;
      position: relative;
      .light-img{
        width: 7.375rem;
        height: 7.375rem;
        background: url("@/assets/img/s_bee_card_light.png") no-repeat;
        background-size: 100%;
        position: absolute;
        top: -3.75rem;
        right: 0.5rem;
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
          background: url("@/assets/img/s_bee_card_border_up.png") no-repeat;
          background-size: 100%;
        }
        &::after{
          bottom: 0;
          background: url("@/assets/img/s_bee_card_border_down.png") no-repeat;
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
          background: url("@/assets/img/s_bee_card_border.png") no-repeat;
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
  .popup-warpper.warimg-pop{
    ::v-deep .popup-cont{
      // top: 30%;
    }
    .warimg-img{
      width: 13.125rem;
      height: 14.75rem;
      margin: 0 auto;
      background: url("@/assets/img/s_waring.png") no-repeat;
      background-size: 100%;
    }
    h3{
      padding-top: 4rem;
      text-align: center;
      p{
        padding-bottom: 1rem;
      }
    }
    .btn-img{
      width: 20rem;
      height: 5rem;
      margin: 2.5rem auto 0;
      background: url("@/assets/img/s_card_btn.png") no-repeat;
      background-size: 100%;
      transition: all 0.2s ease;

      &:active{
        transform: scale(0.98);
      }
    }
    .btn-close{
      margin: 2.5rem auto 0;
    }
  }
  @media only screen and (min-width:375px) and (max-width:413px) {
    
  }
</style>
