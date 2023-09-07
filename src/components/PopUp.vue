<template>
  <div
    :class="[show && 'show-pop']"
    class="popup-warpper"
    @touchmove="touchmoveEvent"
    @mousewheel="touchmoveEvent"
    @click.stop="maskClick">
    <div class="popup-bg"></div>
    <div class="popup-cont" :class="[show && 'show-main']" @click.stop>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopUp',
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
  .popup-warpper{
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
      transition: all ease-in-out .2s;
    }
    .popup-bg{
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
    }
    .popup-cont{
      position: absolute;
      top: 20%;
      left: 0;
      width: 100%;
      .btn-close{
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: url("@/assets/img/icon_close.png") no-repeat;
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
      animation: showPop ease-in-out .25s;
    }
  }
@keyframes showPop {
  from {
    visibility: hidden;
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
  }
}

 @media only screen and (min-width:950px) {
   .popup-warpper{
     .popup-cont{
       .btn-close{
        cursor: pointer;
        transition: all 0.15s ease;
         &:hover{
           transform: scale(1.05);
           background-color: rgba(#fff, 0.2);
         }
         &:active{
           background-color: rgba(#fff, 0.25);
           transform: scale(0.95);
         }
       }
     }
   }

 }
</style>
