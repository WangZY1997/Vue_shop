// 路由器对象
import Vue from 'vue'
import VueRouter from 'vue-router'
const MSite = () => import('@/pages/MSite/MSite.vue')
const Search = () => import('@/pages/Search/Search.vue')
const Order = () => import('@/pages/Order/Order.vue')
const Profile = () => import('@/pages/Profile/Profile.vue')
// import MSite from '../pages/MSite/MSite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import Ording from '../components/Ording/Ording'
// 声明使用插件
Vue.use(VueRouter)
export default new VueRouter({
    // 所有路由
    mode:'history',
    routes:[
        {
            path:'/msite',
            component:MSite,
            meta:{
                showFooter:true
            }
        },
        {
            path:'/search',
            component:Search,
            meta:{
                showFooter:true   //显示路由，解决底部导航栏的显示的问题
            }
        },
        {
            path:'/order',
            component:Order,
            meta:{
                showFooter:true
            }
        },
        {
            path:'/profile',
            component:Profile,
            meta:{
                showFooter:true
            },
        },
        {
            path:'/login',
            component:Login
        },{
            path:'/',
            redirect:'/msite'
        },

        {
            path:'/shop',
            component:Shop,
            children:[
                {
                    path:'/shop/goods',
                    component:ShopGoods
                },
                {
                    path:'/shop/ratings',
                    component:ShopRatings
                },
                {
                    path:'/shop/info',
                    component:ShopInfo
                },
                {
                    path:'',
                    redirect:'/shop/goods'
                },
            ]
        },
        {
            path:'/profile/ording',
            component:Ording
        }
        
    ]
})