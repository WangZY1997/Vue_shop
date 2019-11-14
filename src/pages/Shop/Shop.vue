<template>
    <div>
        <ShopHeader></ShopHeader>
          <!-- 此页面中切换路由不跳转页面而是切换组件的方式，（饿了吗中的Tab选项卡类似） -->
        <div class="tab">
            <div class="tab-item">
                <router-link to="/shop/goods" replace>点餐</router-link>
            </div>
             <div class="tab-item">
                <router-link to="/shop/ratings" replace>评价</router-link>
            </div>
             <div class="tab-item">
                <router-link to="/shop/info" replace>商家</router-link>
            </div>
        </div>

     <!-- 路由匹配到的组件将显示在这里 -->
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
        
    </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'
export default {
    mounted(){
        this.$store.dispatch('getShopInfo')
    },
    data(){
        return{

        }
    },
    components:{
        ShopHeader
    }
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
      @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        text-decoration none
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>