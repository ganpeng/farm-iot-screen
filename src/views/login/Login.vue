<template>
  <div class="login-container login-bg">
    <div class="login-form-container">
      <div class="login-title">
        <svg-icon icon-class="login_icon"></svg-icon>
        <h4>物联网大数据平台</h4>
      </div>
      <div class="login-form-field">
        <div class="phone-field form-field-item">
          <div class="icon-field">
            <svg-icon icon-class="login_account"></svg-icon>
          </div>
          <div class="input-field">
            <input v-model="login.mobile" type="text" @input="mobileChangeHandler" placeholder="请输入手机号">
          </div>
        </div>
        <div class="message">{{errorMessage.mobile}}</div>
        <div class="password-field form-field-item">
          <div class="icon-field">
            <svg-icon icon-class="login_password"></svg-icon>
          </div>
          <div class="input-field">
            <input v-model="login.password" :type="inputType" @input="passwordChangeHandler" placeholder="请输入密码">
          </div>
          <div @click="toggleInputType" class="show-password-btn">
            <svg-icon v-if="inputType === 'text'" icon-class="icon_eye"></svg-icon>
            <svg-icon v-if="inputType === 'password'" icon-class="icon_eye_close"></svg-icon>
          </div>
        </div>
        <div class="message">{{errorMessage.password}}</div>
        <div class="message">{{errorMessage.global}}</div>
        <div class="remember-password">
          <input v-model="isRemember" type="checkbox">
          <div class="checkbox-title">记住密码</div>
        </div>
        <div @click="loginHandler" :class="['login-btn', isDisabeld && 'disabled']">
          登录
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  name: 'Login',
  data() {
    return {
      login: {
        mobile: '',
        password: ''
      },
      isRemember: false,
      inputType: 'password',
      errorMessage: {
        mobile: '',
        password: '',
        global: ''
      }
    };
  },
  created() {
    let remember = this.$util.store.getLocal('remember');
    if (remember) {
      let {mobile, compilePassword, isRemember} = remember;
      this.login.mobile = mobile;
      this.login.password = this.uncompileStr(compilePassword);
      this.isRemember = isRemember;
    }
  },
  computed: {
    validMobile() {
      return !(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.login.mobile));
    },
    validPassword() {
      return this.login.password === '';
    },
    isDisabeld() {
      return this.errorMessage.mobile !== '' || this.errorMessage.password !== '';
    }
  },
  methods: {
    compileStr(code) {
      let c = String.fromCharCode(code.charCodeAt(0) + code.length);
      for (let i = 1; i < code.length; i++) {
          c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
      }
      return escape(c);
    },
    uncompileStr(code) {
      code = unescape(code);
      let c = String.fromCharCode(code.charCodeAt(0) - code.length);
      for (let i = 1; i < code.length; i++) {
          c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
      }
      return c;
    },
    toggleInputType() {
      if (this.inputType === 'password') {
        this.inputType = 'text';
      } else {
        this.inputType = 'password';
      }
    },
    checkMobile(mobile) {
      let errorMessage = ''
      if (mobile === '') {
        errorMessage = '手机号不能为空';
      } else {
        if (this.validMobile) {
          errorMessage = '手机号格式不正确';
        }
      }
      return errorMessage;
    },
    checkPassword(password) {
      let errorMessage = '';
      if (password === '') {
        errorMessage = '密码不能为空';
      }
      return errorMessage;
    },
    mobileChangeHandler: _.debounce(function() {
      this.errorMessage.mobile = this.checkMobile(this.login.mobile);
      this.errorMessage.mobile = '';
    }, 300),
    passwordChangeHandler: _.debounce(function() {
      this.errorMessage.password = this.checkPassword(this.login.password);
      this.errorMessage.global = '';
    }, 300),
    setMemberData() {
      let {mobile, password} = this.login;
      let compilePassword = this.compileStr(password);
      this.$util.store.setLocal('remember', {
        mobile,
        compilePassword,
        isRemember: this.isRemember
      });
    },
    checkAuth(data) {
      let {resourceList, roleType} = data;
      if (roleType === 'SUPER_ADMIN') {
        return true;
      }

      let index = resourceList.findIndex((item) => item.resourceName === `大屏统计`);
      if (index >= 0) {
        return true;
      } else {
        return false;
      }
    },
    async loginHandler() {
      try {
        if (this.isDisabeld) {
          return false;
        }
        let res = await this.$service.login(this.login);
        if (res && res.code === 0) {
          if (this.checkAuth(res.data)) {
            this.$util.store.setLocal('login', res.data);
            if (this.isRemember) {
              this.setMemberData();
            } else {
              this.$util.store.delLocal('remember');
            }
            this.$router.push({name: 'Home'});
          } else {
            alert(`暂无此权限，请联系平台管理员`);
          }
        } else {
          this.errorMessage.global = res.message;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #0A0C22;
  .login-form-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6.5rem;
    height: 4.6rem;
    padding: 0.4rem 1.24rem;
    background: #23344f;
    box-shadow: 0.02rem 0.04rem 0.1rem 0 rgba(0, 0, 0, 0.3);
    border-radius: 0.08rem;
    opacity: 0.94;
    border: 1px solid #6b7da1;
    .login-title {
      display: flex;
      align-items: center;
      justify-content: center;
      .svg-icon {
        width: 0.42rem;
        height: 0.52rem;
        margin-right: 0.16rem;
      }
      h4 {
        font-size: 0.28rem;
        font-weight: 500;
        color: #fff;
      }
    }
    .login-form-field {
      width: 100%;
      margin: 0 auto;
      margin-top: 0.5rem;
      .form-field-item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 0.5rem;
        margin-top: 0.2rem;
        border: 1px solid #585969;
        border-radius: 0.04rem;
        .icon-field {
          display: flex;
          align-items: center;
          width: 0.28rem;
          height: 100%;
          margin-left: 0.15rem;
        }
        .input-field {
          flex: 1;
          height: 100%;
          input {
            width: 100%;
            height: 100%;
            background:none;
            outline:none;
            border:none;
            caret-color: #f0f0f0;
            color: #fff;
            &::-webkit-input-placeholder {
              font-size: 0.14rem;
            }
          }
        }
      }
      .message {
        color: #dc4a51;
        font-size: 0.14rem;
        margin-top: 0.08rem;
        text-align: left;
      }
      .phone-field {
        .svg-icon {
          width: 0.12rem;
          height: 0.18rem;
        }
      }
      .password-field {
        position: relative;
        .svg-icon {
          width: 0.14rem;
          height: 0.18rem;
        }
        .show-password-btn {
          position: absolute;
          top: 50%;
          right: 0.15rem;
          transform: translateY(-50%);
          cursor: pointer;
          .svg-icon {
            width: 0.17rem;
            height: 0.08rem;
          }
        }
      }
      .remember-password {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .checkbox-title {
          color: #70CAEE;
          font-size: 0.12rem;
          margin-left: 0.05rem;
        }
      }
      .login-btn {
        width: 100%;
        height: 0.44rem;
        line-height: 0.44rem;
        text-align: center;
        background: linear-gradient(180deg, #4A7DFF 0%, #2662FF 100%);
        border-radius: 5px;
        color: #fff;
        font-size: 0.16rem;
        margin-top: 0.4rem;
        cursor: pointer;
        &.disabled {
          opacity: 0.5;
          cursor: default;
        }
      }
    }
  }
}
</style>