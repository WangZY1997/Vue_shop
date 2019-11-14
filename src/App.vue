<template>
    <div id="app">
        <router-view></router-view>

           <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
// import {reqAddress} from './api'
import {mapActions} from 'vuex'
export default {
  //   第一种方式写异步
     mounted(){
    // reqFoodcategorys().then(response=>{
    //    console.log(response.data);})
    //      reqAddress({position:"40.10038,116.36867"}).then(response=>{
    //         console.log(response.data);

    //    })
        //  this.$store.dispatch('getAddress')
        // this.getAddress()
        // this.getUserInfo()  //因为没有接口，所以调用404
    },
  // 第二种异步操作
  //       async mounted(){
  //           const result = await reqFoodTypes()
  //           console.log(result);
  //       },
    methods:{
        ...mapActions(['getAddress','getUserInfo'])
    },
    components:{
        FooterGuide
    }

}
</script>
<style lang="stylus"  rel="stylesheet/stylus">
    #app
        width 100%
        height 100%
        background-color #f5f5f5
</style>
