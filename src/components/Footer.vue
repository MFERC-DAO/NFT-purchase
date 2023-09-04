<template>
  <footer>
    <ul class="fx fx-x-center">
      <!-- 添加class:gold-active为激活状态 -->
      <li class="gold-active"><div class="btn-menu">金蜂</div></li>
      <!-- 添加class:purple-active为激活状态 -->
      <li class="purple-active"><div class="btn-menu">紫蜂</div></li>
      <!-- 添加class:silver-active为激活状态 -->
      <li class="silver-active"><div class="btn-menu">黑蜂</div></li>
      <!-- 添加class:my-active为激活状态 -->
      <li class="my-active"><div class="btn-menu">我的</div></li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/css/common.scss";
  footer{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 100%;

    li{
      width: 6.3125rem;
      height: 5.4375rem;
      background: url("@/assets/img/btn_menu.png") no-repeat;
      background-size: 100%;
      + li{
        margin-left: 1.25rem;
      }
      .btn-menu{
        line-height: 5.4375rem;
        text-align: center;
        font-size: 1.75rem;
        font-weight: bold;
        color: $color-w-m;
      }
      &.gold-active{
        background: url("@/assets/img/btn_menu_on.png") no-repeat;
        background-size: 100%;
        .btn-menu{
          color: #000;
        }
      }
      &.purple-active{
        background: url("@/assets/img/btn_menu_z_on.png") no-repeat;
        background-size: 100%;
        .btn-menu{
          color: #fff;
        }
      }
      &.silver-active{
        background: url("@/assets/img/btn_menu_s_on.png") no-repeat;
        background-size: 100%;
        .btn-menu{
          color: #000;
        }
      }
      &.my-active{
        background: url("@/assets/img/btn_menu_my_on.png") no-repeat;
        background-size: 100%;
        .btn-menu{
          color: #000;
        }
      }
    }
  }
  @media only screen and (min-width:950px) {
    footer{
      top: 0;
      bottom: auto;
      ul{
        li{
          background: url("@/assets/img/pc/btn_menu.png") no-repeat;
          background-size: 100%;
          &.gold-active{
            background: url("@/assets/img/pc/btn_menu_on.png") no-repeat;
            background-size: 100%;
          }
          &.purple-active{
            background: url("@/assets/img/pc/btn_menu_z_on.png") no-repeat;
            background-size: 100%;
          }
          &.silver-active{
            background: url("@/assets/img/pc/btn_menu_s_on.png") no-repeat;
            background-size: 100%;
          }
          &.my-active{
            background: url("@/assets/img/pc/btn_menu_my_on.png") no-repeat;
            background-size: 100%;
          }
          .btn-menu{
            line-height: 4.5rem;
          }
        }
      }
    }
  }
</style>
