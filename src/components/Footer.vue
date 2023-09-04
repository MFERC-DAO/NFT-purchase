<template>
  <footer>
    <ul class="fx fx-x-center">
      <li class="active"><div class="btn-menu">金蜂</div></li>
      <li class="bee-z-active"><div class="btn-menu">紫蜂</div></li>
      <li class="silver-active"><div class="btn-menu">黑蜂</div></li>
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
      + li{
        margin-left: 1.25rem;
      }
      .btn-menu{
        width: 6.3125rem;
        height: 5.4375rem;
        line-height: 5.4375rem;
        text-align: center;
        font-size: 1.75rem;
        font-weight: bold;
        color: $color-w-m;
        background: url("@/assets/img/btn_menu.png") no-repeat;
        background-size: 100%;
      }
      &.active{
        .btn-menu{
          color: #000;
          background: url("@/assets/img/btn_menu_on.png") no-repeat;
          background-size: 100%;
        }
      }
      &.bee-z-active{
        .btn-menu{
          color: #fff;
          background: url("@/assets/img/btn_menu_z_on.png") no-repeat;
          background-size: 100%;
        }
      }
      &.silver-active{
        .btn-menu{
          color: #000;
          background: url("@/assets/img/btn_menu_s_on.png") no-repeat;
          background-size: 100%;
        }
      }
      &.my-active{
        .btn-menu{
          color: #000;
          background: url("@/assets/img/btn_menu_my_on.png") no-repeat;
          background-size: 100%;
        }
      }
    }

  }
</style>
