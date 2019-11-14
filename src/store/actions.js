// t通过muations间接更新state的多个方法的对象
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS, RECEIVE_SHOPS,RECEIVE_USER_INFO,RESET_USER_INFO,
    RECEIVE_GOODS,RECEIVE_RATINGS,RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,DECREMENT_FOOD_COUNT,CLEAR_CART,RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
    reqAddress,
    reqFoodCategorys,
    reqShops,
    reqUserInfo,
    reqLogout,
    reqShopInfo,
    reqShopGoods,
    reqShopRatings,
    reqSearchShop,

}
from '../api'

export default{
    //异步获取地址
    async getAddress({commit,state}){
        // 1.发送异步ajax请求
        const geohash = state.latitude + ','+state.longitude
        // 参数叫做position 的geohash
       const result = await reqAddress({position:geohash})
        // 2.提交mutation
        if(result.code===0){
            const address = result.data
            commit(RECEIVE_ADDRESS,{address})
        }
       

    },
    // 异步获取食品分类列表
    async getCategorys({commit}){
        // 1.发送异步ajax请求
       const result = await reqFoodCategorys()
        // 2.提交mutation
        if(result.code===0){
            const categorys = result.data
            commit(RECEIVE_CATEGORYS,{categorys})
        }
    },

    // 异获取商家列表
    // async getShops({commit,state}){
    //     // 1.发送异步ajax请求
    //    const {longitude,latitude} = state
    //    const result = await reqShops(longitude,latitude)
    //     // 2.提交mutation
    //     if(result.code===0){
    //         const shops = result.data
    //         commit(RECEIVE_SHOPS,{shops})
    //         // console.log(shops);
            
    //     }
    // },

    async getShops({commit}){
        // 1.发送异步ajax请求
       const result = await reqShops()
       console.log(result);
        // 2.提交mutation
        if(result.status === 200){
            const shops = result.data.storesList
            commit(RECEIVE_SHOPS,{shops})
            console.log(shops);
        }
       
                
    },

    // 同步记录用户信息
    recordUser({commit},userInfo){
        commit(RECEIVE_USER_INFO,{userInfo})
    },

    // 异步获取用户数据
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if(result.code===0){
            const ususerInfo = result.data
            commit(RECEIVE_USER_INFO,{userInfo})
        }
    },

    // 异步登出
    async logout({commit}){
        const result = await reqLogout()
        if(result.code===0){
            commit(RESET_USER_INFO)
        }
    },

    // 异步获取商家信息
    async getShopInfo({commit}){
        const result = await reqShopInfo()
        if(result.code===0){
            const info = result.data
            commit(RECEIVE_INFO,{info})
        }
    },
    async getShopRatings({commit},callback){
        const result = await reqShopRatings()
        if(result.code===0){
            const ratings = result.data
            commit(RECEIVE_RATINGS,{ratings})
            callback && callback()
        }
    },
    async getShopGoods({commit},callback){
        const result = await reqShopGoods()
        if(result.code===0){
            const goods = result.data
            console.log(goods)
            commit(RECEIVE_GOODS,{goods})
            // 数据更新了，通知一下组件
            callback && callback()
        }
    },
    // async getShopGoods({commit},callback){
    //     const result = await reqShopGoods()
    //     if(result.status===200){
    //         const goods = result.data.goodsList
    //         console.log(goods)
    //         commit(RECEIVE_GOODS,{goods})
    //         // 数据更新了，通知一下组件
    //         callback && callback()
    //     }
    // },

    // 同步更新food中的count数量
    updateFoodCount({commit},{isAdd,food}){
        if(isAdd){
            commit(INCREMENT_FOOD_COUNT,{food})
        }else{
            commit(DECREMENT_FOOD_COUNT,{food})
        }
    },
    // 同步清空购物车
    clearCart({commit}){
        commit(CLEAR_CART)
    },

    // 异步获取搜索商家信息
    async searchShops ({commit, state}, keyword) {
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqSearchShop(geohash, keyword)
        if (result.code === 0) {
          const searchShops = result.data
          commit(RECEIVE_SEARCH_SHOPS, {searchShops})
        }
      }
  



}