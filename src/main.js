import Vue from 'vue'
import App from './App.vue'
import { Button } from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/css/reset.css'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './mock/mockServer'   //加载mockserver即可
import './filter'  //加载过滤器
    
//注册全局组件标签
Vue.component(Button.name, Button)
Vue.use(VueLazyload,{ //内部自定义指令
    loading

})

new Vue ({
    el:'#app',
    render:h=>h(App),
    router,
    store

})