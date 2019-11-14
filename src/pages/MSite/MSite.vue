<template>
    <div class="msite">
        <!-- 首页头部 -->
        <HeaderTop :title="address.name">
            <router-link class="header_search" slot="left" to="/search">
                <i class="iconfont icon-sousuo1"></i>
            </router-link>
            <router-link class="header_login" slot="right" to="">
                <span class="header_login_text">登录|注册 </span>
            </router-link>
        </HeaderTop>
        <!--首页导航轮播图-->
        <nav class="msite_nav">
        <!-- swiper的容器div -->
        <div class="swiper-container"  v-if="categorys.length">
            <!-- swiper的包裹层div -->
            <div class="swiper-wrapper">
            <!-- swiper的轮播div -->
            <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key='index'>
                <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key='index'>
                <div class="food_container">
                  <img :src="baseImageUrl+category.image_url " alt="">
                </div>
                <span>{{category.title}}</span>
                </a>
            </div>
            </div>
            <!-- swiper轮播图圆点 -->
            <div class="swiper-pagination"></div>
        </div>
        <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家  -->
        <div class="msite_shop_list border-1px">
                <div class="shop_header">
                    <i class="iconfont icon-xuanxiang"></i>
                    <span class="shop_header_title">附近商家</span>
                </div>

                <ShopList></ShopList>
            </div>
        </div>

</template>
<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop"
import ShopList from "../../components/ShopList/ShopList"

import Swiper from "swiper"
import 'swiper/css/swiper.min.css'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      baseImageUrl:'https://s1.st.meishij.net/r'
    }
  },
    mounted() {
      // 发请求，读数据，取数据
      // this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
    },
    // 监听这个categorys

    computed: {
      ...mapState(['address','categorys']),
      // 根据categorys一维数组生成一个二维数组（小数组中的个数最大是8个）
      categorysArr(){
        const {categorys} = this
        // 先准备一个空的二维数组
        const arr = []
        // 准备一个小数组，最大长度为8
          let minArr = []
          // 遍历，
          categorys.forEach(c=>{

          // 如果小数组已经满了，就重新赋值一个数组
            if(minArr.length===8){
              minArr = []
            }

          // 如果minArr是空的，将小数组保存到大数组中
          if(minArr.length===0){
            arr.push(minArr)
          }
          // 将当前分类保存到小数组中
              minArr.push(c)
          })
        return arr
      }
    },
    watch:{
      categorys(value){   //发生改变就是有数据了（在异步更新之前执行）
      //   setTimeout(()=>{
      //      new Swiper('.swiper-container',{
      //       loop:true,
      //        pagination:{ //分页器
      //             el:'.swiper-pagination'
      //                   }
      //   })
      // },100)
      // 界面更新就立即 创建swiper对象
      this.$nextTick(()=>{  //一旦完成界面更新就立即调用（写在数据更新之后）
           setTimeout(()=>{
           new Swiper('.swiper-container',{
            loop:true,
             pagination:{ //分页器
                  el:'.swiper-pagination'
                        }
        })
      },100)
      })

      }

    },
    components:{
       HeaderTop ,
       ShopList
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
    .msite
    width 100%
    .miste-content-wrapper
      position fixed
      top: 45px
      bottom: 46px
      width: 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            top: 10px;
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0 10px
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
