import ajax from "./ajax";
// const BASE_URL = 'https://mockapi.eolinker.com/d4fvFDyd98de571ce31b650d9976b2d9466de6f74c442a0'
// const BASE_URL = 'http://localhost:8080';
const BASE_URL = '/api'
// 包含应用n个（接口请求函数的模块）
// 函数的返回值依然是promise对象

// test
export const reqShops=()=>ajax(BASE_URL+`/store/list`)

// 1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)
export const reqAddress=(geohash)=>ajax(BASE_URL+`/position`,geohash) 
// 2、获取食品分类列表](#2获取食品分类列表)
export const reqFoodCategorys=()=>ajax(BASE_URL+`/index_category`)
// 3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)
// export const reqShops=(longitude,latitude)=>ajax(BASE_URL+`/shops`,{longitude,latitude})
// 4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops', {geohash, keyword})
// 6、用户名密码登陆](#6用户名密码登陆)
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(`/login_pwd`,{name, pwd, captcha},'POST')
// 7、发送短信验证码](#7发送短信验证码)
export const reqSendCode = (phone) => ajax('/sendcode', {phone})
// 8、手机号验证码登陆](#8手机号验证码登陆)
export const reqSmsLogin = (phone,code) => ajax('/login_sms', {phone,code},'POST')
// 9、根据会话获取用户信息](#9根据会话获取用户信息)
export const reqUserInfo = () => ajax('/userinfo')
// 10、用户登出](#10用户登出)
export const reqLogout = () => ajax('/logout')

export const reqShopInfo = ()=>ajax('/info')
export const reqShopRatings = ()=>ajax('/ratings')
export const reqShopGoods = ()=>ajax('/goods')

// export const reqShopGoods = ()=>ajax(BASE_URL+`/shop/list`)
// export const reqShopType = ()=>ajax(BASE_URL+`/shop/type`)