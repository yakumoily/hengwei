<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去
          <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" v-model="phone" placeholder="请输入你的手机号" @blur="testPhone">
        <span class="error-msg" :class="index1">{{phoneText}}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input v-model="code" type="text" placeholder="请输入验证码" @blur="testCode">
        <button @click="getRegisterCode">获取验证码</button>
        <span class="error-msg" :class="index2">{{codeText}}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input v-model="password" type="password" placeholder="请输入你的登录密码" @blur="testPassword">
        <span class="error-msg" :class="index3">{{passwordText}}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input v-model="password2" type="password" placeholder="请输入确认密码" @blur="testPassword2">
        <span class="error-msg" :class="index4">{{password2Text}}</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="isChecked">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg" :class="isChecked?'right_active':'error_active'">{{checked}}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
import { reqRegister, reqRegisterCode } from '@/api'
export default {
  name: 'RegisterContainer',
  data () {
    return {
      phone: '',
      password: '',
      password2: '',
      code: '',
      index1: '',
      isPhone: false,
      isCode: false,
      isPassword: false,
      isPassword2: false,
      phoneText: '请输入11位手机号',
      index2: '',
      codeText: '',
      index3: '',
      passwordText: '必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-16之间',
      index4: '',
      password2Text: '',
      checked: '请勾选',
      isChecked: false
    }
  },
  methods: {
    // 请求二维码
    async getRegisterCode () {
      if (this.isPhone) {
        const res = await reqRegisterCode(this.phone)
        if (res.code === 200) {
          this.code = res.data
        }
      }
    },
    // 注册
    async register () {
      if (this.isChecked && this.isPhone && this.isCode && this.isPassword && this.isPassword2) {
        const res = await reqRegister({
          phone: this.phone,
          password: this.password,
          code: this.code
        })
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: '注册成功',
            type: 'success'
          })
          this.$router.push('/login')
        } else {
          this.$message({
            showClose: true,
            message: '账号已被注册',
            type: 'error'
          })
        }
      }
    },
    testPhone () {
      const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|19[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (reg.test(this.phone)) {
        this.index1 = 'right_active'
        this.phoneText = '输入成功'
        this.isPhone = true
      } else {
        this.index1 = 'error_active'
        this.phoneText = '输入的号码不和规，请重新输入'
        this.isPhone = false
      }
    },
    testPassword () {
      const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
      if (reg.test(this.password)) {
        this.index3 = 'right_active'
        this.passwordText = '输入成功'
        this.isPassword = true
      } else {
        this.index3 = 'error_active'
        this.passwordText = '输入的号码不和规，请重新输入'
        this.isPassword = false
      }
    },
    testPassword2 () {
      if (this.password2 === this.password) {
        this.index4 = 'right_active'
        this.password2Text = '输入成功'
        this.isPassword2 = true
      } else {
        this.index4 = 'error_active'
        this.password2Text = '与原密码不符，请重新输入'
        this.isPassword2 = false
      }
    },
    testCode () {
      const reg = /^\d{6}$/
      if (reg.test(this.code)) {
        this.index2 = 'right_active'
        this.codeText = '输入成功'
        this.isCode = true
      } else {
        this.index2 = 'error_active'
        this.codeText = '输入的号码不和规，请重新输入'
        this.isCode = false
      }
    }
  },
  watch: {
    isChecked (newval) {
      if (newval) {
        this.checked = '已勾选'
      } else {
        this.checked = '请勾选'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: #aaa;
        }
        .error_active{
          color: red !important;
        }
        .right_active{
          color: green !important;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: #aaa;
        }
        .error_active{
          color: red !important;
        }
        .right_active{
          color: green !important;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>
