<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">green外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{'on':loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{'on': !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{'on':loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <!-- 通过改变class类的方式切换样式，数据获取的三种方式 1.data 2.计算属性  3.props -->
              <!-- 点击表单里面的任意一个按钮 都会提交表单 所以验证码的时候是要发送验证码 所以要阻止默认提交行为 -->
              <button :disabled="!rightPhone"  class="get_verification" :class="{'right_phone':rightPhone}" 
              @click.prevent="getCode">{{computetime>0? `已发送(${computetime}s)`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖账号的手机号 登录时将自动注册 且代表已同意注册
              <a href="#">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{'on':!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" />
              </section>
              <section class="login_verification">
                <!-- 密码有两个input框 一个明文密码 一个不可见密码 -->
                <input type="text" maxlength="8" placeholder="密码" v-if=" showPwd" v-model="pwd" />
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd" />
                <div
                  class="switch_button"
                  :class="showPwd?'on' :'off' "
                  @click="showPwd = !showPwd"
                >
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <div class="switch_text">{{showPwd ? 'abc' : '***'}}</div>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" />
                <img class="get_verification" src="./images/captcha.svg" alt="captcha"  @click="getcaptcha" ref="captcha"/>
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href class="about_us">关于我们</a>
      </div>
      <span href class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
    <AlertTip :alertText="alertText" v-show="Alertshow" @closeTip="closeTip" />
  </div>
</template>
<script>
import AlertTip from "../../components/AlertTip/AlertTip";
import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api'
export default {
  data() {
    return {
      loginWay: true, //代表短信登录，false代表密码的登录
      phone: "", //初始化手机号
      computetime: 0, //计时的时间，
      showPwd: false, //是否显示密码
      pwd: "", //密码
      code: "", //短信验证码
      captcha: "", //图形验证码
      name: "", //用户名
      alertText: "", //空串（提示文本）
      Alertshow: false //是否显示数据
    };
  },
  computed: {
    // 检查手机号格式合法不合法
    rightPhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  methods: {
   async getCode() {
      // 只有当没有计时的时候
      if (this.computetime === 0) {
        // console.log(!this.computetime);//或者！this.computetime
        // 启动倒计时
        this.computetime = 30;
        this.interval = setInterval(() => {
          this.computetime--;
          if (this.computetime === 0) {
            clearInterval(this.interval);
          }
        }, 1000);
      }

      // 定时器（循环）
      // 发送ajax请求,(向指定的手机号发送请求)
      const result = await reqSendCode(this.phone)
      if(result.code===1){
        // 显示提示
        this.showAlert(result.msg)
        // 停止倒计时
        if(this.computeTime){
          this.computeTime = 0
          clearInterval(this.interval)
          this.interval = null 
        }
      }
},
    closeTip() {
      this.alertText = "";
      this.Alertshow = false;
    },
    showAlert(alertText) {
      this.Alertshow = true;
      this.alertText = alertText;
    },

    async login() {
      let result
      // 异步登录
      // 表单数据验证（前台）
      if (this.loginWay) {
        //短信登录
        const { rightPhone, phone, code } = this;
        if (!this.rightPhone) {
          //  抽取一个方法!
          // this.showAlert = true
          // this.alertText = '手机号不正确'
          this.showAlert("手机号不正确");
          return
        } else if (!code) {
          // 验证码不对---6位数字
          this.showAlert("验证码不正确");
          return
        }
        // 发送ajax请求(发送短信请求)
        result = await reqSmsLogin(phone,code)
      } else {
        // 密码登录
        const { name, pwd, captcha } = this;
        if (!this.name) {
          // 用户名必须指定
          this.showAlert("用户名不为空");
          return
        } else if (!this.pwd) {
          // 密码必须指定
          this.showAlert("密码不为空");
          return
        } else if (!this.captcha) {
          // 验证码必须指定
          this.showAlert("验证码不为空");
          return
        }
        // 发送ajax请求(发送密码请求)
         result = await reqPwdLogin({phone,code,captcha})
      }
         // 停止倒计时
        if(this.computeTime){
          this.computeTime = 0
          clearInterval(this.interval)
          this.interval = null 
        }
      // 根据结果处理数据
      if(result.code === 0){
            const user = result.data
            // 将user保存到state中
          this.$store.dispatch('recordUser',user)
            // 跳转路由(去个人中心页面)
            this.$router.replace('/profile')
        }else{
          // 显示新的图片验证码
          this.getcaptcha()
          // 显示提示 
            const msg = result.msg
            this.showAlert(msg)

        }
    },
    getcaptcha(){
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
    }
  },
  components: {
    AlertTip
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        > a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      > form {
        > div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right_phone {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              > .switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            > a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      > .iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
