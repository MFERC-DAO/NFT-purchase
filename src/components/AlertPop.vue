<template>
  <div
    :class="[show && 'show-pop']"
    class="alert-popup-warpper"
    @click.stop="maskClick">
    <div class="alert-popup-bg"></div>
    <div class="alert-popup-cont" :class="[show && 'show-main']" @click.stop>
      <div class="fx">
        <div class="alert-icon-img fx-shrink"></div>
        <div class="alert-cont fx-fill">
          <h3>
            <slot name="title"></slot>
          </h3>
          <slot/>
        </div>
      </div>
      <div class="btn-close"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AlertPop',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    preventBoo: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    touchmoveEvent (e) {
      this.preventBoo && e.preventDefault()
    },
    maskClick () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped lang="scss">
 @import "@/assets/css/common.scss";
  .alert-popup-warpper{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    visibility: hidden;
    opacity: 0;
    &.show-pop {
      visibility: visible;
      opacity: 1;
    }
    &.hidePop {
      visibility: hidden;
      opacity: 0;
    }
    .alert-popup-cont{
      position: absolute;
      top: 15%;
      left: 10%;
      width: 80%;
      border: 2px solid #000;
      padding: 20px;
      border-radius: 10px;
      background: linear-gradient(130deg, rgba(#000,0.5) 0%, rgba(#fff,0.15) 30%,rgba(#000,0.5) 50%,rgba(#fff,0.1) 65%,rgba(#000,0.5) 100%);
      backdrop-filter: blur(6px);
      .alert-icon-img{
        width: 4rem;
        height: 4rem;
        margin-right: 1rem;
        background: url("@/assets/img/alert_icon.png") no-repeat;
        background-size: 100%;
      }
      h3{
        color: #ff7300;
        font-size: 16px;
        font-weight: bold;
      }
      .alert-cont{
        word-break: break-all;
      }
      .btn-close{
        position: absolute;
        top: 10px;
        right: 10px;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: url("@/assets/img/alert_icon_close.png") no-repeat;
        background-size: 100%;
        transition: all 0.15s ease;
        &:active{
          background-color: rgba(#fff, 0.2);
          transform: scale(0.95);
        }
      }
    }
    .show-main {
      z-index: 100;
      animation: showPop ease-out .25s;
    }
  }
@keyframes showPop {
  from {
    opacity: 0;
    transform: translateX(50%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes hidePop {
  from {
    visibility: visible;
    opacity: 1;
  }
  to {
    visibility: hidden;
    opacity: 0;
  }
}
 @media only screen and (min-width:800px) {
   .alert-popup-warpper{
     .alert-popup-cont{
       width: 320px;
       left: auto;
       top: 120px;
       right: 50px;
       .alert-icon-img{
         width: 40px;
         height: 40px;
         margin-right: 20px;
       }
       .btn-close{
         width: 20px;
         height: 20px;
         cursor: pointer;
         &:hover{
           background-color: rgba(#fff, 0.5);
         }
         &:active{
           background-color: rgba(#fff, 0.2);
           transform: scale(0.95);
         }
       }
     }
   }
 }
</style>
