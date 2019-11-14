<template>
  <header class="header">
    <!-- 左右部分内容不确定有无 需要插槽占位 -->
    <slot name="left"></slot>

    <!-- 中间部分一直有内容 只是不同router-view的此部分内容不确定 -->
    <a class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </a>

    <slot name="right"></slot>
  </header>
</template>

<script>
// import {mapState} from 'vuex' 
  export default {
    props: {
      title: String
    },
    // computed: {
    //     ...mapState(['address'])
    // },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .header
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .icon-sousuo
        font-size 25px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      margin-left -5%
      .header_title_text
        font-size 20px
        color #fff
        display block
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
</style>
